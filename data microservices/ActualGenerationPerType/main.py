import sys
import ActualGenerationPerType.AGPT_data_handling as agpt
from Shared.utils import loadAndFilterData, sendDataToFile, sendDataToDatabase

if __name__ == "__main__":
    csvPath = sys.argv[1]
    data = loadAndFilterData(csvPath, dataFilter=agpt.filterData)
    sqlData = agpt.dataToSql(data)

    sendDataToFile(sqlData, outputPath='../output_agpt.sql')
    sendDataToDatabase(sqlData, databaseName='AGPT')
