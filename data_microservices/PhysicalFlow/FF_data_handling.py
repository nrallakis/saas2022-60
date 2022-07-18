import sys
sys.path.append("../Shared")
from utils import *
import json


def filterData(csvData, latestDateTime):
    data = []
    for row in csvData.itertuples():
        rowData = row[1].split('\t')
        outAreaTypeCode = rowData[3]

        # Only interested in CTY data
        if outAreaTypeCode != 'CTY' or outAreaTypeCode != 'CTY':
            continue

        dateTime = datetime.strptime(rowData[0], "%Y-%m-%d %H:%M:%S.000")
        outMapCode = rowData[5]
        inMapCode = rowData[9]
        flowValue = rowData[10]
        updateTime = datetime.strptime(rowData[11], "%Y-%m-%d %H:%M:%S")
        data.append((dateTime, outMapCode, inMapCode, flowValue, updateTime))

    data.sort(key=sortByDate)
    # data = keepDataAfter(data, latestDateTime)
    return data


def sortByDate(row):
    dateTime = row[0]
    return dateTime


def appendBatchEnding(sqlString):
    sqlString = sqlString[:-2] + '\n'
    sqlString += "ON DUPLICATE KEY UPDATE "
    sqlString += "datetime = Value(dateTime), " \
                 "flowValue = Value(flowValue), " \
                 "updateTime = Value(updateTime);\n"
    return sqlString


def dataToSql(data):
    sqlString = "INSERT INTO PhysicalFlows " \
                "(dateTime, outMapCode, inMapCode, flowValue, updateTime) VALUES\n"
    counter = 1
    # Traverse in ASC datetime order. This way the latest update will be the one staying in the DB
    for row in reversed(data):
        dateTime = row[0]
        outMapCode = row[1]
        inMapCode = row[2]
        flowValue = row[3] if row[3] else 'NULL'
        updateTime = row[4]

        sqlString += f"('{dateTime}', '{outMapCode}', '{inMapCode}', {flowValue}, '{updateTime}'),\n"

        # SQL insert limit = 1000
        if counter % 1000 == 0:
            sqlString = appendBatchEnding(sqlString)
            sqlString += "INSERT INTO PhysicalFlows (dateTime, outMapCode, inMapCode, flowValue, updateTime) VALUES\n"
        counter += 1

    if counter % 1000 != 0:
        sqlString = appendBatchEnding(sqlString)
    return sqlString

def find_diffs(data_prev, data_new):
    prev = sort_data(data_prev)
    new = sort_data(data_new)
    i, j = 0, 0
    length = len(new)
    length_prev = len(prev)
    insertions, updates = [], []
    while(i < length):
        if j>=length_prev:
            insertions += new[i:]
            break
        # datetime comparison
        if(new[i][0] < prev[j][0]):
            insertions.append(new[i])
            i += 1
            continue
        if(new[i][0] > prev[j][0]):
            j += 1
            continue

        # mapCode comparison
        if(new[i][1] < prev[j][1]):
            insertions.append(new[i])
            i += 1
            continue
        if(new[i][1] > prev[j][1]):
            j += 1
            continue

        # same measurement go on ((dateTime, outMapCode, inMapCode, flowValue, updateTime))
        if(new[i][0] == prev[j][0] \
            and new[i][1] == prev[j][1]\
                and new[i][2] == prev[j][2]\
                    and new[i][3] == prev[j][3]):
            i += 1
            j += 1
            continue

        # regarding update time - keep the newer one
        if(new[i][4] > prev[j][4]):
            updates.append(new[i])
            i += 1
            j += 1
            continue
        if(new[i][4] < prev[j][4]):
            i += 1
            j += 1
            continue
    
    return insertions, updates

    
def dict_data(insertions, updates):
    ins_list, upd_list = [], []
    for i in insertions:
        ins = {"dateTime" :i[0].strftime("%Y-%m-%d %H:%M:%S.000"), "outMapCode":i[1], "inMapCode":i[2], "flowValue":i[3], \
            "updateTime":i[4].strftime("%Y-%m-%d %H:%M:%S.000")}
        ins_list.append(ins)
    for i in updates:
        upd = {"dateTime" :i[0].strftime("%Y-%m-%d %H:%M:%S.000"), "outMapCode":i[1], "inMapCode":i[2], "flowValue":i[3], \
            "updateTime":i[4].strftime("%Y-%m-%d %H:%M:%S.000")}
        upd_list.append(upd)

    dict = {'type':'FF', 'insertions':ins_list, 'updates': upd_list}
    return dict

def json_data(insertions, updates):
    dictionary = dict_data(insertions, updates)
    return json.dumps(dictionary)