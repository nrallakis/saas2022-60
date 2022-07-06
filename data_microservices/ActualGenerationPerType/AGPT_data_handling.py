from data_microservices.Shared.utils import *


def sortByDate(row):
    dateTime = row[0]
    return dateTime


def filterData(csv_data, latestDateTime):
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


def appendBatchEnding(sqlString):
    sqlString = sqlString[:-2] + '\n'
    sqlString += "ON DUPLICATE KEY UPDATE "
    sqlString += "datetime = Value(dateTime), " \
                 "actualGenerationOutput = Value(actualGenerationOutput), " \
                 "actualConsumption = Value(actualConsumption), " \
                 "updateTime = Value(updateTime);\n"
    return sqlString


def dataToSql(data):
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

        sqlString += f"('{dateTime}', '{mapCode}', '{productionType}', {actualGenerationOutput}," \
                     f" {actualConsumption}, '{updateTime}'),\n"

        # SQL insert limit = 1000
        if counter % 1000 == 0:
            sqlString = appendBatchEnding(sqlString)
            sqlString += "INSERT INTO AggregatedGenerationPerType (" \
                "dateTime, mapCode, productionType, actualGenerationOutput, " \
                "actualConsumption ,updateTime) VALUES\n"
        counter += 1
    if counter % 1000 != 0:
        sqlString = appendBatchEnding(sqlString)

    return sqlString
