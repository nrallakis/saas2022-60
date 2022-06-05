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
        totalLoadValue = rowData[6]
        updateTime = rowData[7]
        data.append((dateTime, mapCode, totalLoadValue, updateTime))

    data.sort(key=sortByDate)
    data = keepDataAfter(data, latestDateTime)
    return data


def batchInsertSuffix(sqlString):
    sqlString = sqlString[:-2] + '\n'
    sqlString += "ON DUPLICATE KEY UPDATE "
    sqlString += "datetime = Value(dateTime), " \
                 "actualTotalLoad = Value(actualTotalLoad), " \
                 "updateTime = Value(updateTime);\n"
    return sqlString


def dataToSqlFile(csv_data, outputPath, latestDateTime):
    # Create or Truncate the output file
    outputStream = open(outputPath, "w")
    data = sortAndFilterData(csv_data, latestDateTime)
    sqlString = "INSERT INTO ActualTotalLoad (dateTime, mapCode, actualTotalLoad, updateTime) VALUES\n"
    counter = 1
    # Traverse in ASC datetime order. This way the latest update will be the one staying in the DB
    for row in reversed(data):
        DateTime = row[0]
        MapCode = row[1]
        UpdateTime = row[3]
        TotalLoadValue = row[2]

        # Broken into lines for better reading
        sqlString += "('{}', '{}', {}, '{}'),\n".format(DateTime,
                                                        MapCode, TotalLoadValue, UpdateTime)

        if counter % 1000 == 0:
            sqlString = batchInsertSuffix(sqlString)
            sqlString += "INSERT INTO ActualTotalLoad (dateTime, mapCode, actualTotalLoad, updateTime) VALUES\n"
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
