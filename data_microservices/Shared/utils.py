import os
from datetime import datetime, timedelta
import pandas as pd
from sqlalchemy.dialects.mysql import mariadb
from datetime import datetime, timedelta
# from kafka import KafkaProducer
import json

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

def sendToKafka(jsonMessage, topicName, hostname):
    # setup the Producer object
    producer = KafkaProducer(bootstrap_servers=f'{hostname}:9092',
                             value_serializer=lambda v: json.dumps(v).encode('utf-8'))
    producer.send(topic=topicName, value=jsonMessage)
    producer.flush() 
    # 'kafka' instead of 'localhost' if inside a container stack 


def csv_path(starting_date, file_ext_type="AggregatedGenerationPerType16.1.BC.csv", time_interval=(0,0,1)):
    """
    -starting_date: eg. 2000_01_01_01
    -file_ext_type: the whole extension of the file as string - not sure if it is useful to be changed
    -time_interval: (sec, min, h) of the refresh rate
    """
    time_diff = timedelta(seconds=time_interval[0], minutes=time_interval[1], hours=time_interval[2])
    file_date = datetime(*map(int, starting_date.split('_'))) + time_diff
    file_date_string = file_date.strftime("%Y_%m_%d_%H")
    csv_path = file_date_string + '_' + file_ext_type
    return file_date_string, csv_path


def sort_data(data):
    data_sorted = sorted(data, key=lambda x:(x[0],x[1]))
    return data_sorted

if __name__ == '__main__':
    pass