import os
from pickle import TRUE
from sqlite3 import Cursor
from xmlrpc.client import DateTime
import mariadb
from unittest import case
import pandas as pd
from datetime import datetime, timedelta
import sys
from datetime import datetime

csvPath = sys.argv[1]


def read_file(starting_date, file_ext_type="AggregatedGenerationPerType16.1.BC.csv", time_interval=(1, 0, 0)):
    """
    Starts from a custom datetime (in a real situation would be datetime.now()), reads file(s) with refresh rate equal to time_interval
    -starting_date: (years, month, day, hour)
    -file_ext_type: the whole extension of the file as string - not sure if it is useful to be changed
    -time_interval: (sec, min, h) of the refresh rate
    """
    time_diff = timedelta(
        seconds=time_interval[0], minutes=time_interval[1], hours=time_interval[2])
    file_date = starting_date
    while True:
        time_string_format = file_date.strftime("%y_%m_%d_%H_")
        data = pd.read_csv(time_string_format + file_ext_type, sep='\t')

        # Remove type codes <> CTY
        data = data[data["AreaTypeCode"] == "CTY"]

        # Remove row with update time < now
        # filter by single day
        # data = data[data['UpdatedTime'].dt.strftime('%Y-%m-%d') == '2014-01-01']
        data = data.sort_values(by="DateTime")

        # Select columns
        data = data[["DateTime", "MapCode", "ActualGenerationOutput"]]
        data.to_csv("output.csv")
        file_date += time_diff


def dbConnection():
    host_name = os.environ.get('DB_HOST_NAME', '127.0.0.1')
    mydb = mariadb.connect(host=host_name,
                           user='root',
                           passwd='root',
                           db='ATL',
                           port=3306
                           )

    cursor = mydb.cursor()

    # Typical error fix, jus to be sure
    sql = "SET time_zone='+00:00'"
    cursor.execute(sql)
    mydb.commit()

    return mydb, cursor


def sortingCriteria(tuple):
    return tuple[0]


def keepLatestData(dataList, latestDateTime):
    data = []
    if (not dataList):
        return data
    for i in range(len(dataList) - 1, -1, -1):
        if (dataList[i][0] < latestDateTime):
            return data
        data.append(dataList[i])


def sortAndFilterData(csv_data, latestDateTime):
    data = []
    for row in csv_data.itertuples():
        rowData = row[1].split('\t')
        AreaTypeCode = rowData[3]
        # Only interested in CTY data
        if (AreaTypeCode != 'CTY'):
            continue
        rowData[0] = datetime.strptime(rowData[0], "%Y-%m-%d %H:%M:%S.000")

        data.append((rowData[0], rowData[5], rowData[6], rowData[7]))
    data.sort(key=sortingCriteria)
    data = keepLatestData(data, latestDateTime)
    return data


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

        if (counter % 1000 == 0):
            sqlString = sqlString[:-2] + '\n'
            sqlString += "ON DUPLICATE KEY UPDATE "
            sqlString += "datetime = Value(dateTime), actualTotalLoad = Value(actualTotalLoad), updateTime = Value(updateTime);\n"
            sqlString += "INSERT INTO ActualTotalLoad (dateTime, mapCode, actualTotalLoad, updateTime) VALUES\n"
        counter += 1
    if (counter % 1000 != 0):
        sqlString = sqlString[:-2] + '\n'
        sqlString += "ON DUPLICATE KEY UPDATE "
        sqlString += "datetime = Value(dateTime), actualTotalLoad = Value(actualTotalLoad), updateTime = Value(updateTime);\n"
    outputStream.write(sqlString)
    outputStream.close()

    database, cursor = dbConnection()
    cursor.execute(sqlString)
    database.commit()


def csvToSqlFile(csvPath, outputPath, latestDateTime):
    csv_file = csvPath

    data = pd.read_csv(csv_file)
    dataToSqlFile(data, outputPath, latestDateTime)


if __name__ == "__main__":
    # read_file(starting_date = datetime(2021,10,12,12))
    # time_intervals tbd
    etc = []
    year, month, day, hour, etc = csvPath.split("_")
    year = year[-4:]
    currentDateTime = datetime(int(year), int(month), int(day), int(hour))
    latestDateTime = currentDateTime - timedelta(hours=1)

    csvToSqlFile(csvPath, '../output.sql', latestDateTime)
