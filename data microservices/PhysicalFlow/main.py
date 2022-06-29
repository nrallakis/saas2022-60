import sys
import PhysicalFlow.FF_data_handling as ff
from Shared.utils import loadAndFilterData, sendDataToFile, sendDataToDatabase

if __name__ == "__main__":
    csvPath = sys.argv[1]
    data = loadAndFilterData(csvPath, dataFilter=ff.filterData)
    sqlData = ff.dataToSql(data)

    sendDataToFile(sqlData, outputPath='../output_ff.sql')
    sendDataToDatabase(sqlData, databaseName='FF')
