import FF_data_handling as ff
import sys
sys.path.append("../Shared")
import json

from utils import *

if __name__ == "__main__":
    data_path = 'data'
    files = os.listdir(data_path)
    for i in range(len(files)-1):
        print(files[i])
        old_csv = os.path.join(data_path, files[i])
        new_csv = os.path.join(data_path, files[i+1])
        data_prev = loadAndFilterData(old_csv, dataFilter=atl.filterData)
        data_new = loadAndFilterData(new_csv, dataFilter=atl.filterData)
        inserts, updates = atl.find_diffs(data_prev, data_new)
        json = atl.json_data(inserts, updates)
        sendToKafka(json, topicName='physical-flow', hostname='localhost')
        if len(sys.argv) > 1:
            time.sleep(int(sys.argv[1]))
