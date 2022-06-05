import os
import mariadb
import pandas as pd
from datetime import datetime, timedelta
import sys


def connectToDataBase():
    host_name = os.environ.get('DB_HOST_NAME', '127.0.0.1')
    mydb = mariadb.connect(
        host=host_name,
        user='root',
        passwd='root',
        db='AGPT',
        port=3306
    )

    cursor = mydb.cursor()
    return mydb, cursor


def sortByDate(row):
    # Contains the timestamp when the value was sent
    return row[0]


def keepDataAfter(dataList, latestDateTime):
    if not dataList:
        return []

    result = []
    for row in reversed(dataList):
        if row[0] < latestDateTime:
            return result
        result.append(row)


def sortAndFilterData(csv_data, latestDateTime):
    data = []
    for row in csv_data.itertuples():
        rowData = row[1].split('\t')
        areaTypeCode = rowData[3]

        # Only interested in CTY data
        if areaTypeCode != 'CTY':
            continue

        dateTime = datetime.strptime(rowData[0], "%Y-%m-%d %H:%M:%S.000")
        mapCode = rowData[5]
        productionType = rowData[6]
        actualGenerationOutput = rowData[7]
        actualConsumption = rowData[8]
        updateTime = rowData[9]
        data.append((dateTime, mapCode, productionType,
                    actualGenerationOutput, actualConsumption, updateTime))

    data.sort(key=sortByDate)
    data = keepDataAfter(data, latestDateTime)
    return data


def batchInsertSuffix(sqlString):
    sqlString = sqlString[:-2] + '\n'
    sqlString += "ON DUPLICATE KEY UPDATE "
    sqlString += "datetime = Value(dateTime), " \
                 "actualGenerationOutput = Value(actualGenerationOutput), " \
                 "actualConsumption = Value(actualConsumption), " \
                 "updateTime = Value(updateTime);\n"
    return sqlString


def dataToSqlFile(csv_data, outputPath, latestDateTime):
    # Create or Truncate the output file
    outputStream = open(outputPath, "w")
    data = sortAndFilterData(csv_data, latestDateTime)
    sqlString = "INSERT INTO AggregatedGenerationPerType (" \
                "dateTime, mapCode, productionType, actualGenerationOutput, " \
                "actualConsumption ,updateTime) VALUES\n"
    counter = 1
    # Traverse in ASC datetime order. This way the latest update will be the one staying in the DB
    for row in reversed(data):
        dateTime = row[0]
        mapCode = row[1]
        productionType = row[2]
        actualGenerationOutput = row[3] if row[3] else 'NULL'
        actualConsumption = row[4] if row[4] else 'NULL'
        updateTime = row[5]

        # Broken into lines for better reading
        sqlString += "('{}', '{}', '{}', {}, {}, '{}'),\n".format(dateTime,
                                                                  mapCode, productionType, actualGenerationOutput, actualConsumption, updateTime)

        if counter % 1000 == 0:
            sqlString = batchInsertSuffix(sqlString)
            sqlString += "INSERT INTO AggregatedGenerationPerType (" \
                "dateTime, mapCode, productionType, actualGenerationOutput, " \
                "actualConsumption ,updateTime) VALUES\n"
        counter += 1
    if counter % 1000 != 0:
        sqlString = batchInsertSuffix(sqlString)

    outputStream.write(sqlString)
    outputStream.close()

    database, cursor = connectToDataBase()
    cursor.execute(sqlString)
    database.commit()


def csvToSqlFile(csvPath, outputPath, latestDateTime):
    csv_file = csvPath

    data = pd.read_csv(csv_file)
    dataToSqlFile(data, outputPath, latestDateTime)


def extractDateFromFile(csvPath):
    year, month, day, hour, etc = csvPath.split("_")
    year = year[-4:]
    currentDateTime = datetime(int(year), int(month), int(day), int(hour))
    latestDateTime = currentDateTime - timedelta(hours=1)
    return latestDateTime


if __name__ == "__main__":
    csvPath = sys.argv[1]
    latestDateTime = extractDateFromFile(csvPath)

    csvToSqlFile(csvPath, '../output.sql', latestDateTime)
