from datetime import datetime
import unittest
from ATL_data_handling import find_diffs

class TestUtils(unittest.TestCase):

    def test_find_diffs_ATL1(self):
        # update a value
        mockdata_prev = [(datetime(2022,1,31), 'BE', 100, datetime(2022,1,31,1,1,1)), (datetime(2022,1,31), 'BE', 200, datetime(2023,1,31,1,1,1))]
        mockdata_new =  [(datetime(2022,1,31), 'BE', 100, datetime(2022,1,31,1,1,1)), (datetime(2022,1,31), 'BE', 300, datetime(2024,1,31,1,1,1))]
        expected = [(datetime(2022,1,31), 'BE', 300, datetime(2024,1,31,1,1,1))]
        self.assertEqual(find_diffs(mockdata_prev, mockdata_new), expected)

    def test_find_diffs_ATL2(self):
        # insert a value
        mockdata_prev = [(datetime(2022,1,31), 'BE', 100, datetime(2022,1,31,1,1,1)), (datetime(2022,1,31), 'BE', 200, datetime(2023,1,31,1,1,1))]
        mockdata_new =  [(datetime(2022,1,31), 'AB', 300, datetime(2022,1,31,1,1,1)), (datetime(2022,1,31), 'BE', 100, datetime(2022,1,31,1,1,1)), (datetime(2022,1,31), 'BE', 200, datetime(2023,1,31,1,1,1))]
        expected = [(datetime(2022,1,31), 'AB', 300, datetime(2022,1,31,1,1,1))]
        self.assertEqual(find_diffs(mockdata_prev, mockdata_new), expected)

    def test_find_diffs_ATL3(self):
        # no difference
        mockdata_prev = [(datetime(2022,1,31), 'BE', 100, datetime(2022,1,31,1,1,1)), (datetime(2022,1,31), 'BE', 200, datetime(2023,1,31,1,1,1))]
        mockdata_new =  [(datetime(2022,1,31), 'BE', 100, datetime(2023,1,31,1,1,1)), (datetime(2022,1,31), 'BE', 200, datetime(2023,1,31,1,1,1))]
        expected = []
        self.assertEqual(find_diffs(mockdata_prev, mockdata_new), expected)

    def test_find_diffs_ATL4(self):
        # completely different new data
        mockdata_prev = [(datetime(2022,1,31), 'BE', 100, datetime(2022,1,31,1,1,1)), (datetime(2022,1,31), 'BE', 200, datetime(2023,1,31,1,1,1))]
        mockdata_new =  [(datetime(2000,1,31), 'BE', 100, datetime(2023,1,31,1,1,1)), (datetime(2000,1,31), 'BE', 200, datetime(2023,1,31,1,1,1))]
        expected = mockdata_new
        self.assertEqual(find_diffs(mockdata_prev, mockdata_new), expected)

if __name__ == '__main__':
    unittest.main()