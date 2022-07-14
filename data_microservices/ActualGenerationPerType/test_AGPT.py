from datetime import datetime
import unittest

from cv2 import exp
from AGPT_data_handling import find_diffs, dict_data, json_data

class TestUtils(unittest.TestCase):

    # (dateTime, mapCode, productionType, actualGenerationOutput, actualConsumption, updateTime))
    def test_find_diffs_AGPT1(self):
        # update a value
        mockdata_prev = [(datetime(2022,1,31), 'BE', 'BE', 100, 100, datetime(2022,1,31,1,1,1)), (datetime(2022,1,31), 'BE', 'BE', 200, 200, datetime(2023,1,31,1,1,1))]
        mockdata_new =  [(datetime(2022,1,31), 'BE', 'BE', 100, 100, datetime(2022,1,31,1,1,1)), (datetime(2022,1,31), 'BE', 'BE', 300, 200, datetime(2024,1,31,1,1,1))]
        expected = [], [(datetime(2022,1,31), 'BE', 'BE', 300, 200, datetime(2024,1,31,1,1,1))]
        self.assertEqual(find_diffs(mockdata_prev, mockdata_new), expected)

    def test_find_diffs_AGPT1b(self):
        # update a value
        mockdata_prev = [(datetime(2022,1,31), 'BE', 'BE', 100, 100, datetime(2022,1,31,1,1,1)), (datetime(2022,1,31), 'BE', 'BE', 200, 200, datetime(2023,1,31,1,1,1))]
        mockdata_new =  [(datetime(2022,1,31), 'BE', 'BE', 100, 100, datetime(2022,1,31,1,1,1)), (datetime(2022,1,31), 'BE', 'BE', 200, 300, datetime(2024,1,31,1,1,1))]
        expected = [], [(datetime(2022,1,31), 'BE', 'BE', 200, 300, datetime(2024,1,31,1,1,1))]
        self.assertEqual(find_diffs(mockdata_prev, mockdata_new), expected)

    def test_find_diffs_AGPT2(self):
        # insert a value
        mockdata_prev = [(datetime(2022,1,31), 'BE', 'BE', 100, 100, datetime(2022,1,31,1,1,1)), (datetime(2022,1,31), 'BE', 'BE', 200, 200, datetime(2023,1,31,1,1,1))]
        mockdata_new =  [(datetime(2025,1,31), 'BE', 'BE', 400, 400, datetime(2025,1,31,1,1,1)), (datetime(2022,1,31), 'BE', 'BE', 100, 100, datetime(2022,1,31,1,1,1)), (datetime(2022,1,31), 'BE', 'BE', 200, 200, datetime(2023,1,31,1,1,1))]
        expected = [(datetime(2025,1,31), 'BE', 'BE', 400, 400, datetime(2025,1,31,1,1,1))], []
        self.assertEqual(find_diffs(mockdata_prev, mockdata_new), expected)

    def test_find_diffs_AGPT3(self):
        # no difference
        mockdata_prev = [(datetime(2022,1,31), 'BE', 'BE', 100, 100, datetime(2022,1,31,1,1,1)), (datetime(2022,1,31), 'BE', 'BE', 200, 200, datetime(2023,1,31,1,1,1))]
        mockdata_new =  mockdata_prev
        expected = [], []
        self.assertEqual(find_diffs(mockdata_prev, mockdata_new), expected)
    
    def test_find_diffs_AGPT4(self):
        # completely different new data
        mockdata_prev = [(datetime(2022,1,31), 'BE', 'BE', 100, 100, datetime(2022,1,31,1,1,1)), (datetime(2022,1,31), 'BE', 'BE', 200, 200, datetime(2023,1,31,1,1,1))]
        mockdata_new =  [(datetime(2027,1,31), 'BE', 'BE', 100, 100, datetime(2027,1,31,1,1,1)), (datetime(2028,1,31), 'BE', 'BE', 200, 200, datetime(2028,1,31,1,1,1))]
        expected = mockdata_new, []
        self.assertEqual(find_diffs(mockdata_prev, mockdata_new), expected)

    def test_dict_data1(self):
        ins, upd = [], []
        expected = {'type':'AGPT', 'insertions':[], 'updates': []}
        self.assertEqual(dict_data(ins, upd), expected)

    def test_dict_data2(self):
        ins, upd = [(datetime(2022,1,31), 'BE', 'BE', 100, 100, datetime(2022,1,31,1,1,1))], []
        expected = {'type':'AGPT', 'insertions':[{"actualConsumption":100, "actualGenerationOutput":100, \
                        "dateTime":'2022-01-31 00:00:00.000', "mapCode":'BE', "productionType":'BE', \
                            "updateTime":'2022-01-31 01:01:01.000'}], 'updates': []}
        self.assertEqual(dict_data(ins, upd), expected)

    def test_dict_data3(self):
        ins, upd = [(datetime(2022,1,31), 'BE', 'BE', 100, 100, datetime(2022,1,31,1,1,1)),(datetime(2022,1,31), 'BE', 'BE', 200, 200, datetime(2022,1,31,1,1,1))], []
        expected = {'type':'AGPT', 'insertions':[{"actualConsumption":100, "actualGenerationOutput":100, \
                        "dateTime":'2022-01-31 00:00:00.000', "mapCode":'BE', "productionType":'BE', \
                            "updateTime":'2022-01-31 01:01:01.000'},\
                                {"actualConsumption":200, "actualGenerationOutput":200, \
                        "dateTime":'2022-01-31 00:00:00.000', "mapCode":'BE', "productionType":'BE', \
                            "updateTime":'2022-01-31 01:01:01.000'}], 'updates': []}
        self.assertEqual(dict_data(ins, upd), expected)

    def test_json_data(self):
        ins, upd = [(datetime(2022,1,31), 'BE', 'BE', 100, 100, datetime(2022,1,31,1,1,1))], []
        expected = '{"type": "AGPT", "insertions": [{"dateTime": "2022-01-31 00:00:00.000", "mapCode": "BE", "productionType": "BE", "actualGenerationOutput": 100, "actualConsumption": 100, "updateTime": "2022-01-31 01:01:01.000"}], "updates": []}'
        actual = json_data(ins, upd)
        self.assertEqual(actual, expected)

    def test_json_data2(self):
        ins, upd = [(datetime(2022,1,31), 'BE', 'BE', 100, 100, datetime(2022,1,31,1,1,1)),(datetime(2022,1,31), 'BE', 'BE', 200, 200, datetime(2024,1,31,1,1,1))], []
        expected = '{"type": "AGPT", "insertions": [{"dateTime": "2022-01-31 00:00:00.000", "mapCode": "BE", "productionType": "BE", "actualGenerationOutput": 100, "actualConsumption": 100, "updateTime": "2022-01-31 01:01:01.000"}, {"dateTime": "2022-01-31 00:00:00.000", "mapCode": "BE", "productionType": "BE", "actualGenerationOutput": 200, "actualConsumption": 200, "updateTime": "2024-01-31 01:01:01.000"}], "updates": []}'
        self.maxDiff=None
        self.assertEqual(json_data(ins, upd), expected)   
if __name__ == '__main__':
    unittest.main()