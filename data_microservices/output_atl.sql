INSERT INTO ActualTotalLoad (dateTime, mapCode, actualTotalLoad, updateTime) VALUES
('2022-01-01 01:00:00', 'CY', 42227, '2022-01-01 01:45:00.000'),
('2022-01-01 00:00:00', 'CY', 50000, '2022-01-01 05:45:00.000'),
('2022-01-01 00:00:00', 'GR', 44620, '2022-01-01 03:00:00.000')
ON DUPLICATE KEY UPDATE datetime = Value(dateTime), actualTotalLoad = Value(actualTotalLoad), updateTime = Value(updateTime);
