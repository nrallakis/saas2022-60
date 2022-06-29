from Shared.utils import *


def sortByDate(row):
    dateTime = row[0]
    return dateTime


def filterData(csvData, latestDateTime):
    data = []
    for row in csvData.itertuples():
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


def appendBatchEnding(sqlString):
    sqlString = sqlString[:-2] + '\n'
    sqlString += "ON DUPLICATE KEY UPDATE "
    sqlString += "datetime = Value(dateTime), " \
                 "actualTotalLoad = Value(actualTotalLoad), " \
                 "updateTime = Value(updateTime);\n"
    return sqlString


def dataToSql(data):
    sqlString = "INSERT INTO ActualTotalLoad (dateTime, mapCode, actualTotalLoad, updateTime) VALUES\n"
    counter = 1
    # Traverse in ASC datetime order. This way the latest update will be the one staying in the DB
    for row in reversed(data):
        DateTime = row[0]
        MapCode = row[1]
        UpdateTime = row[3]
        TotalLoadValue = row[2] if row[2] else 'NULL'

        sqlString += f"('{DateTime}', '{MapCode}', {TotalLoadValue}, '{UpdateTime}'),\n"

        # SQL insert limit = 1000
        if counter % 1000 == 0:
            sqlString = appendBatchEnding(sqlString)
            sqlString += "INSERT INTO ActualTotalLoad (dateTime, mapCode, actualTotalLoad, updateTime) VALUES\n"
        counter += 1

    if counter % 1000 != 0:
        sqlString = appendBatchEnding(sqlString)

    return sqlString

