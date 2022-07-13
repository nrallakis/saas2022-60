import sys
import PhysicalFlow.FF_data_handling as ff
sys.path.append("../Shared")
from utils import *

if __name__ == "__main__":
    csvPath = sys.argv[1]
    data = loadAndFilterData(csvPath, dataFilter=ff.filterData)
    sqlData = ff.dataToSql(data)

    sendDataToFile(sqlData, outputPath='../output_ff.sql')
    sendDataToDatabase(sqlData, databaseName='FF')
