import sys
sys.path.append("../Shared")
from utils import *
import json

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
        updateTime = datetime.strptime(rowData[7], "%Y-%m-%d %H:%M:%S")
        data.append((dateTime, mapCode, totalLoadValue, updateTime))

    data.sort(key=sortByDate)
    # data = keepDataAfter(data, latestDateTime)
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

        # same measurement go on (dateTime, mapCode, totalLoadValue, updateTime)
        if(new[i][0] == prev[j][0] \
            and new[i][1] == prev[j][1]\
                and new[i][2] == prev[j][2]):
            i += 1
            j += 1
            continue

        # regarding update time - keep the newer one
        if(new[i][3] > prev[j][3]):
            updates.append(new[i])
            i += 1
            j += 1
            continue
        if(new[i][3] < prev[j][3]):
            i += 1
            j += 1
            continue
    return insertions, updates

def dict_data(insertions, updates):
    ins_list, upd_list = [], []
    for i in insertions:
        ins = {"dateTime" :i[0].strftime("%Y-%m-%d %H:%M:%S.000"), "mapCode":i[1], "actualTotalLoad":i[2], \
            "updateTime":i[3].strftime("%Y-%m-%d %H:%M:%S.000")}
        ins_list.append(ins)
    for i in updates:
        upd = {"dateTime" :i[0].strftime("%Y-%m-%d %H:%M:%S.000"), "mapCode":i[1], "actualTotalLoad":i[2], \
                "updateTime":i[3].strftime("%Y-%m-%d %H:%M:%S.000")}
        upd_list.append(upd)

    dict = {'type':'ATL', 'insertions':ins_list, 'updates': upd_list}
    return dict

def json_data(insertions, updates):
    dictionary = dict_data(insertions, updates)
    return json.dumps(dictionary)