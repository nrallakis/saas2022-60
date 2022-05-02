import pandas as pd
from datetime import datetime

data = pd.read_csv("2022_02_28_23_AggregatedGenerationPerType16.1.BC.csv", sep='\t')
# print(data)

# Remove type codes <> CTY
data = data[data["AreaTypeCode"] == "CTY"]

# Remove row with update time < now
# filter by single day
# data = data[data['UpdatedTime'].dt.strftime('%Y-%m-%d') == '2014-01-01']
data = data.sort_values(by="DateTime")

# Select columns
data = data[["DateTime", "MapCode", "ActualGenerationOutput"]]
print(data)
data.to_csv("output.csv")
