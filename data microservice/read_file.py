import os
import mariadb
import pandas as pd
from datetime import datetime, timedelta
import sys


def connectToDataBase():
    host_name = os.environ.get('DB_HOST_NAME', '127.0.0.1')
    mydb = mariadb.connect(host=host_name,
                           user='root',
                           passwd='root',
                           db='ATL',
                           port=3306
                           )

    cursor = mydb.cursor()

    return mydb, cursor


def sortbyDate(tuple):
    # Contains the timestamp when the value was sent
    return tuple[0]


def keepLatestData(dataList, latestDateTime):
    data = []
    if not dataList:
        return data
    for i in range(len(dataList) - 1, -1, -1):
        if dataList[i][0] < latestDateTime:
            return data
        data.append(dataList[i])


def sortAndFilterData(csv_data, latestDateTime):
    data = []
    for row in csv_data.itertuples():
        rowData = row[1].split('\t')
        AreaTypeCode = rowData[3]
        # Only interested in CTY data
        if AreaTypeCode != 'CTY':
            continue
        rowData[0] = datetime.strptime(rowData[0], "%Y-%m-%d %H:%M:%S.000")

        data.append((rowData[0], rowData[5], rowData[6], rowData[7]))
    data.sort(key=sortbyDate)
    data = keepLatestData(data, latestDateTime)
    return data


def bacthInsertSuffix(sqlString):
    sqlString = sqlString[:-2] + '\n'
    sqlString += "ON DUPLICATE KEY UPDATE "
    sqlString += "datetime = Value(dateTime), actualTotalLoad = Value(actualTotalLoad), updateTime = Value(updateTime);\n"
    return sqlString


def dataToSqlFile(csv_data, outputPath, latestDateTime):
    # Create or Truncate the output file
    outputStream = open(outputPath, "w")
    data = sortAndFilterData(csv_data, latestDateTime)
    sqlString = "INSERT INTO ActualTotalLoad (dateTime, mapCode, actualTotalLoad, updateTime) VALUES\n"
    counter = 1
    # Traverse in ASC datetime order. This way the latest update will be the one staying in the DB
    for i in range(len(data) - 1, -1, -1):
        DateTime = data[i][0]
        MapCode = data[i][1]
        UpdateTime = data[i][3]
        TotalLoadValue = data[i][2]

        # Broken into lines for better reading
        sqlString += "('{}', '{}', {}, '{}'),\n".format(DateTime,
                                                        MapCode, TotalLoadValue, UpdateTime)

        if counter % 1000 == 0:
            sqlString = bacthInsertSuffix(sqlString)
            sqlString += "INSERT INTO ActualTotalLoad (dateTime, mapCode, actualTotalLoad, updateTime) VALUES\n"
        counter += 1

    if counter % 1000 != 0:
        sqlString = bacthInsertSuffix(sqlString)

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
    etc = []
    year, month, day, hour, etc = csvPath.split("_")
    year = year[-4:]
    currentDateTime = datetime(int(year), int(month), int(day), int(hour))
    latestDateTime = currentDateTime - timedelta(hours=1)
    return latestDateTime


if __name__ == "__main__":
    csvPath = sys.argv[1]
    latestDateTime = extractDateFromFile(csvPath)

    csvToSqlFile(csvPath, '../output.sql', latestDateTime)
