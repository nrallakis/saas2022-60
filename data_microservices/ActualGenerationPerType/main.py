import AGPT_data_handling as agpt

import sys
sys.path.append("../Shared")
import json

from utils import *

if __name__ == "__main__":
    if len(sys.argv) != 2 : 
        print("usage: python filename 'YYYY_MM_DD_HH'")
        exit(1)
    _, old_csv = csv_path(starting_date=sys.argv[1], file_ext_type="AggregatedGenerationPerType16.1.BC.csv", time_interval=(0,0,0))
    _, new_csv = csv_path(starting_date=sys.argv[1], file_ext_type="AggregatedGenerationPerType16.1.BC.csv", time_interval=(0,0,1))
    data_prev = loadAndFilterData(old_csv, dataFilter=agpt.filterData)
    data_new = loadAndFilterData(new_csv, dataFilter=agpt.filterData)
    ins, upd = agpt.find_diffs(data_prev, data_new)

    json = agpt.json_data(ins, upd)
    print(json)

    