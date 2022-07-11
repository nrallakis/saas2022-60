import sys
import ActualGenerationPerType.AGPT_data_handling as agpt
from data_microservices.Shared.utils import loadAndFilterData, sendDataToFile, sendDataToDatabase, csv_path

if __name__ == "__main__":
    csvPath = csv_path(starting_date=sys.argv[1], file_ext_type="AggregatedGenerationPerType16.1.BC.csv", time_interval=(0,0,1))
    data = loadAndFilterData(csvPath, dataFilter=agpt.filterData)
    sqlData = agpt.dataToSql(data)

    sendDataToFile(sqlData, outputPath='../output_agpt.sql')
    sendDataToDatabase(sqlData, databaseName='AGPT')
