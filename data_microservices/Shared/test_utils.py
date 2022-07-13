from sqlite3 import Date
from datetime import datetime
import unittest
from utils import csv_path, sort_data

class TestUtils(unittest.TestCase):

    # csv_path
    def test_csv_path(self):
        startingDate = '2000_01_01_01'
        self.assertEqual(csv_path(startingDate), ('2000_01_01_02', '2000_01_01_02_AggregatedGenerationPerType16.1.BC.csv'))

    # sort data
    def test_sort_data_easy(self):
        mockdata = [(datetime(2022,1,31), 'BE'), (datetime(2021,1,31), 'AB' )]
        expected = [(datetime(2021,1,31), 'AB' ), (datetime(2022,1,31), 'BE')]
        self.assertEqual(sort_data(mockdata), expected)

    def test_sort_data_sameDate(self):
        mockdata = [(datetime(2022,1,31), 'BE', 'A'), (datetime(2022,1,31), 'AB', 'B' )]
        expected = [(datetime(2022,1,31), 'AB', 'B' ), (datetime(2022,1,31), 'BE', 'A')]
        self.assertEqual(sort_data(mockdata), expected)
    
    def test_sort_data_moreComplex(self):
        mockdata = [(datetime(2022,1,31), 'BE', 'A'), (datetime(2022,1,31), 'AB', 'B' ), (datetime(2021,1,31), 'BE', 'A'), (datetime(2021,1,31), 'AB', 'B' )]
        expected = [(datetime(2021,1,31), 'AB', 'B' ), (datetime(2021,1,31), 'BE', 'A'), (datetime(2022,1,31), 'AB', 'B' ), (datetime(2022,1,31), 'BE', 'A')]
        self.assertEqual(sort_data(mockdata), expected)


if __name__ == '__main__':
    unittest.main()