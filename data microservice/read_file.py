import os
from sqlite3 import Cursor
import mariadb
from unittest import case
import pandas as pd
from datetime import datetime, timedelta
import sys

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
    host_name = os.environ.get('DB_HOST_NAME', 'localhost')
    mydb = mariadb.connect(host=host_name,
                           user='root',
                           passwd='root',
                           db='ATL',
                           port=3306)

    cursor = mydb.cursor()

    # Typical error fix, jus to be sure
    sql = "SET time_zone='+00:00'"
    cursor.execute(sql)
    mydb.commit()

    return mydb, cursor


def fetchCurrentMonthData():
    database, cursor = dbConnection()
    sqlQuery = "SELECT * FROM ActualTotalLoad WHERE DATEDIFF(month, updateTime, GETDATE()) = 1"

    cursor.execute(sqlQuery)
    database.commit()

    return cursor


def dataToSqlFile(csv_data, outputPath):

    # Create or Truncate the output file
    outputStream = open(outputPath, "w")

    sqlString = "INSERT INTO ActualTotalLoad VALUES \n"
    counter = 1
    for row in csv_data.itertuples():
        rowData = tuple(row[1].split('\t'))
        AreaTypeCode = rowData[3]

        # Only interested in CTY data
        if (AreaTypeCode != 'CTY'):
            continue
        MapCode = rowData[5]
        TotalLoadValue = rowData[6]
        UpdateTime = rowData[7]
        sqlString += "('{}', {}, '{}'),\n".format(MapCode,
                                                  TotalLoadValue, UpdateTime)

        if counter == 1000:
            sqlString = sqlString[:-2] + ";\n"
            sqlString += "INSERT INTO ActualTotalLoad VALUES \n"
            counter = 1
        counter += 1

    sqlString = sqlString[:-2] + ";"

    database, cursor = dbConnection()
    cursor.execute(sqlString)
    database.commit()

    outputStream.write(sqlString)
    outputStream.close()


def csvToSqlFile(csvPath, outputPath):
    csv_file = csvPath

    data = pd.read_csv(csv_file)
    dataToSqlFile(data, outputPath)


if __name__ == "__main__":
    # read_file(starting_date = datetime(2021,10,12,12))
    # time_intervals tbd

    csvToSqlFile(csvPath, '../output.sql')
    output = fetchCurrentMonthData()
    for row in output:
        print(row)
