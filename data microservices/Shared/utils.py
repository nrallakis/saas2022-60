import os
from datetime import datetime, timedelta
import pandas as pd
from sqlalchemy.dialects.mysql import mariadb


def loadAndFilterData(filePath, dataFilter):
    latestDateTime = extractDateFromFileName(filePath)
    pd.read_csv(filePath)
    data = pd.read_csv(filePath)
    return dataFilter(data, latestDateTime)


def keepDataAfter(dataList, latestDateTime):
    """
    dataList: must be sorted ascending
    """
    if not dataList:
        return []

    result = []
    for row in reversed(dataList):
        dateTime = row[0]
        if dateTime < latestDateTime:
            return result
        result.append(row)


def extractDateFromFileName(csvPath):
    year, month, day, hour, etc = csvPath.split("_")
    year = year[-4:]
    currentDateTime = datetime(int(year), int(month), int(day), int(hour))
    latestDateTime = currentDateTime - timedelta(hours=1)
    return latestDateTime


def sendDataToFile(data, outputPath):
    outputStream = open(outputPath, "w")
    outputStream.write(data)
    outputStream.close()


def sendDataToDatabase(sql, databaseName):
    database, cursor = connectToDatabase(databaseName)
    cursor.execute(sql)
    database.commit()


def connectToDatabase(databaseName):
    host_name = os.environ.get('DB_HOST_NAME', '127.0.0.1')
    mydb = mariadb.connect(
        host=host_name,
        user='root',
        passwd='root',
        db=databaseName,
        port=3306
    )
    cursor = mydb.cursor()
    return mydb, cursor
