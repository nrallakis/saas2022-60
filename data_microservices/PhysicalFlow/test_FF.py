from datetime import datetime
import unittest
from FF_data_handling import find_diffs, json_data

class TestUtils(unittest.TestCase):

    def test_find_diffs_FF1(self):
        # update a value
        mockdata_prev = [(datetime(2022,1,31), 'BE', 'BE', 100, datetime(2022,1,31,1,1,1)), (datetime(2022,1,31), 'BE', 'BE', 200, datetime(2023,1,31,1,1,1))]
        mockdata_new =  [(datetime(2022,1,31), 'BE', 'BE', 100, datetime(2022,1,31,1,1,1)), (datetime(2022,1,31), 'BE', 'BE', 300, datetime(2024,1,31,1,1,1))]
        expected = [], [(datetime(2022,1,31), 'BE', 'BE', 300, datetime(2024,1,31,1,1,1))]
        self.assertEqual(find_diffs(mockdata_prev, mockdata_new), expected)

    def test_find_diffs_FF2cd (self):
        # insert a value
        mockdata_prev = [(datetime(2022,1,31), 'BE', 'BE', 100, datetime(2022,1,31,1,1,1)), (datetime(2022,1,31), 'BE', 'BE', 200, datetime(2023,1,31,1,1,1))]
        mockdata_new =  [(datetime(2022,1,31), 'AB', 'AB', 100, datetime(2022,1,31,1,1,1)), (datetime(2022,1,31), 'BE', 'BE', 100, datetime(2022,1,31,1,1,1)), (datetime(2022,1,31), 'BE', 'BE', 200, datetime(2023,1,31,1,1,1))]
        expected = [(datetime(2022,1,31), 'AB', 'AB', 100, datetime(2022,1,31,1,1,1))], []
        self.assertEqual(find_diffs(mockdata_prev, mockdata_new), expected)

    def test_find_diffs_FF3(self):
        # no difference
        mockdata_prev = [(datetime(2022,1,31), 'BE', 'BE', 100, datetime(2022,1,31,1,1,1)), (datetime(2022,1,31), 'BE', 'BE', 200, datetime(2023,1,31,1,1,1))]
        mockdata_new =  mockdata_prev
        expected = [], []
        self.assertEqual(find_diffs(mockdata_prev, mockdata_new), expected)
    
    def test_find_diffs_FF4(self):
        # completely different new data
        mockdata_prev = [(datetime(2022,1,31), 'BE', 'BE', 100, datetime(2022,1,31,1,1,1)), (datetime(2022,1,31), 'BE', 'BE', 200, datetime(2023,1,31,1,1,1))]
        mockdata_new =  [(datetime(2022,1,31), 'AB', 'AB', 100, datetime(2022,1,31,1,1,1)), (datetime(2028,1,31), 'BE', 'BE', 200, datetime(2023,1,31,1,1,1))]
        expected = [(datetime(2022,1,31), 'AB', 'AB', 100, datetime(2022,1,31,1,1,1)), (datetime(2028,1,31), 'BE', 'BE', 200, datetime(2023,1,31,1,1,1))], []
        self.assertEqual(find_diffs(mockdata_prev, mockdata_new), expected)
    
    def test_json_data(self):
        ins, upd = [(datetime(2022,1,31), 'AB', 'AB', 100, datetime(2022,1,31,1,1,1)), (datetime(2028,1,31), 'BE', 'BE', 200, datetime(2023,1,31,1,1,1))], []
        expected = '{"type": "FF", "insertions": [{"dateTime": "2022-01-31 00:00:00.000", "outMapCode": "AB", "inMapCode": "AB", "flowValue": 100, "updateTime": "2022-01-31 01:01:01.000"}, {"dateTime": "2028-01-31 00:00:00.000", "outMapCode": "BE", "inMapCode": "BE", "flowValue": 200, "updateTime": "2023-01-31 01:01:01.000"}], "updates": []}'
        actual = json_data(ins, upd)
        self.maxDiff = None
        self.assertEqual(actual, expected)

if __name__ == '__main__':
    unittest.main()