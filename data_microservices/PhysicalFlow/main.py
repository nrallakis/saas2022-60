import FF_data_handling as ff
import sys
sys.path.append("../Shared")
import json

from utils import *

if __name__ == "__main__":
    if len(sys.argv) != 2 : 
        print("usage: python filename 'YYYY_MM_DD_HH'")
        exit(1)
    _, old_csv = csv_path(starting_date=sys.argv[1], file_ext_type="PhysicalFlows12.1.G.csv", time_interval=(0,0,0))
    _, new_csv = csv_path(starting_date=sys.argv[1], file_ext_type="PhysicalFlows12.1.G.csv", time_interval=(0,0,1))
    data_prev = loadAndFilterData(old_csv, dataFilter=ff.filterData)
    data_new = loadAndFilterData(new_csv, dataFilter=ff.filterData)
    ins, upd = find_diffs(data_prev, data_new)

    json = json_data(ins, upd)
    print(json)