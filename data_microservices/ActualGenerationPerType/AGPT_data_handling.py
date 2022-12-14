from datetime import datetime
import sys
sys.path.append("../Shared")
import json

from utils import *


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
        updateTime = datetime.strptime(rowData[9], "%Y-%m-%d %H:%M:%S")
        data.append((dateTime, mapCode, productionType,
                    actualGenerationOutput, actualConsumption, updateTime))

    data.sort(key=sortByDate)
    #data = keepDataAfter(data, latestDateTime)
    return data


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

        # same measurement go on (dateTime, mapCode, productionType, actualGenerationOutput, actualConsumption, updateTime))
        if(new[i][0] == prev[j][0] \
            and new[i][1] == prev[j][1]\
                and new[i][3] == prev[j][3]\
                    and new[i][4] == prev[j][4]):
            i += 1
            j += 1
            continue


        # regarding update time - keep the newer one
        if(new[i][5] > prev[j][5]):
            updates.append(new[i])
            i += 1
            j += 1
            continue
        if(new[i][5] < prev[j][5]):
            i += 1
            j += 1
            continue
    
    return insertions, updates

def dict_data(insertions, updates):
    ins_list, upd_list = [], []
    for i in insertions:
        ins = {"dateTime" :i[0].strftime("%Y-%m-%d %H:%M:%S.000"), "mapCode":i[1], "productionType":i[2], \
                "actualGenerationOutput":i[3], "actualConsumption":i[4], "updateTime":i[5].strftime("%Y-%m-%d %H:%M:%S.000")}
        ins_list.append(ins)
    for i in updates:
        upd = {"dateTime":i[0].strftime("%Y-%m-%d %H:%M:%S.000"), "mapCode":i[1], "productionType":i[2], \
                "actualGenerationOutput":i[3], "actualConsumption":i[4], "updateTime":i[5].strftime("%Y-%m-%d %H:%M:%S.000")}
        upd_list.append(upd)

    dict = {'type':'AGPT', 'insertions':ins_list, 'updates': upd_list}
    return dict

def json_data(insertions, updates):
    dictionary = dict_data(insertions, updates)
    return json.dumps(dictionary)

