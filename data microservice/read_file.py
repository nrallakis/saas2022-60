import pandas as pd
from datetime import datetime, timedelta
import sys

csvPath = sys.argv[1]

def read_file(starting_date, file_ext_type="AggregatedGenerationPerType16.1.BC.csv", time_interval=(1,0,0)):
    """
    Starts from a custom datetime (in a real situation would be datetime.now()), reads file(s) with refresh rate equal to time_interval
    -starting_date: (years, month, day, hour)
    -file_ext_type: the whole extension of the file as string - not sure if it is useful to be changed
    -time_interval: (sec, min, h) of the refresh rate
    """
    time_diff = timedelta(seconds=time_interval[0], minutes=time_interval[1], hours=time_interval[2])
    file_date = starting_date
    while True:
        time_string_format = file_date.strftime("%y_%m_%d_%H_")
        data = pd.read_csv(time_string_format + file_ext_type, sep='\t')

        # Remove type codes <> CTY
        data = data[data["AreaTypeCode"] == "CTY"]

        # Remove row with update time < now
        # filter by single day
        # data = data[data['UpdatedTime'].dt.strftime('%Y-%m-%d') == '2014-01-01']
        data = data.sort_values(by="DateTime")

        # Select columns
        data = data[["DateTime", "MapCode", "ActualGenerationOutput"]]
        data.to_csv("output.csv")
        file_date += time_diff

def dataToSqlFile(csv_data, outputPath):

    # Create or Truncate the output file
    outputStream = open(outputPath, "w")

    sqlString = "INSERT INTO TotalLoad VALUES \n" 
    counter = 1
    for row in csv_data.itertuples():
        rowData = tuple(row[1].split('\t'))
        ArreaTypeCode = rowData[3]
        
        # Only interested in CTY data
        if (ArreaTypeCode != 'CTY') :
            continue
        MapCode = rowData[5]
        TotalLoadValue = rowData[6]
        UpdateTime = rowData[7]
        sqlString += "('{}', {}, '{}'),\n".format(MapCode, TotalLoadValue, UpdateTime)

        if counter == 1000:
            sqlString = sqlString[:-2] + ";\n"
            sqlString += "INSERT INTO TotalLoad VALUES \n" 
            counter = 0
        counter+=1

    sqlString = sqlString[:-2] + ";"
    outputStream.write(sqlString)
    outputStream.close()


def csvToSqlFile(csvPath, outputPath):
    csv_file = csvPath

    data = pd.read_csv(csv_file)
    dataToSqlFile(data, outputPath)


if __name__ == "__main__":
    # read_file(starting_date = datetime(2021,10,12,12))
    # time_intervals tbd 
    csvToSqlFile(csvPath, '../output.sql')