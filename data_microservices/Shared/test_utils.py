from sqlite3 import Date
import unittest
from utils import csv_path

class TestUtils(unittest.TestCase):

    def test_csv_path(self):
        startingDate = '2000_01_01_01'
        self.assertEqual(csv_path(startingDate), ('2000_01_01_02', '2000_01_01_02_AggregatedGenerationPerType16.1.BC.csv'))


if __name__ == '__main__':
    unittest.main()