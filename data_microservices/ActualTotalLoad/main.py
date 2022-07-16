import sys
import ATL_data_handling as atl
sys.path.append("../Shared")
from utils import *

if __name__ == "__main__":
    csvPath = sys.argv[1]
    print(csvPath)
    data = loadAndFilterData(csvPath, dataFilter=atl.filterData)
    sqlData = atl.dataToSql(data)

    sendDataToFile(sqlData, outputPath='../output_atl.sql')
    sendDataToDatabase(sqlData, databaseName='ATL')
    