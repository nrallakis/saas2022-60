import AGPT_data_handling as agpt

import sys
sys.path.append("../Shared")
import json
import time

from utils import *

if __name__ == "__main__":
    data_path = 'data'
    files = os.listdir(data_path)
    for i in range(len(files)-1):
        print(files[i])
        old_csv = os.path.join(data_path, files[i])
        new_csv = os.path.join(data_path, files[i+1])
        data_prev = loadAndFilterData(old_csv, dataFilter=agpt.filterData)
        data_new = loadAndFilterData(new_csv, dataFilter=agpt.filterData)
        inserts, updates = agpt.find_diffs(data_prev, data_new)
        json = agpt.json_data(inserts, updates)
        sendToKafka(json, topicName='actual-generation-per-type', hostname='localhost')
        if len(sys.argv) > 1:
            time.sleep(int(sys.argv[1]))


    