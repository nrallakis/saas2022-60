import ATL_data_handling as atl
import sys
sys.path.append("../Shared")
from utils import *

if __name__ == "__main__":
    if len(sys.argv) != 2 : 
        print("usage: python filename 'YYYY_MM_DD_HH'")
        exit(1)
    _, old_csv = csv_path(starting_date=sys.argv[1], file_ext_type="ActualTotalLoad6.1.A.csv", time_interval=(0,0,0))
    _, new_csv = csv_path(starting_date=sys.argv[1], file_ext_type="ActualTotalLoad6.1.A.csv", time_interval=(0,0,1))
    data_prev = loadAndFilterData(old_csv, dataFilter=atl.filterData)
    data_new = loadAndFilterData(new_csv, dataFilter=atl.filterData)
    ins, upd = atl.find_diffs(data_prev, data_new)

    json = atl.json_data(ins, upd)
    print(json)
    