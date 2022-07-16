-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jun 03, 2022 at 04:00 PM
-- Server version: 10.3.35-MariaDB-1:10.3.35+maria~focal
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `AGPT`
--
CREATE DATABASE IF NOT EXISTS `AGPT` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `AGPT`;

-- --------------------------------------------------------

--
-- Table structure for table `AggregatedGenerationPerType`
--

CREATE TABLE `AggregatedGenerationPerType` (
  `mapCode` varchar(2) NOT NULL,
  `productionType` varchar(50) NOT NULL,
  `actualGenerationOutput` float,
  `actualConsumption` float,
  `updateTime` datetime NOT NULL,
  `dateTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `AggregatedGenerationPerType`
--
ALTER TABLE `AggregatedGenerationPerType`
  ADD PRIMARY KEY (`mapCode`,`updateTime`, `productionType`);
--
-- Database: `ATL`
--
CREATE DATABASE IF NOT EXISTS `ATL` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `ATL`;

-- --------------------------------------------------------

--
-- Table structure for table `ActualTotalLoad`
--

CREATE TABLE `ActualTotalLoad` (
  `mapCode` varchar(10) NOT NULL,
  `actualTotalLoad` float,
  `updateTime` datetime NOT NULL,
  `dateTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ActualTotalLoad`
--
ALTER TABLE `ActualTotalLoad`
  ADD PRIMARY KEY (`mapCode`,`updateTime`);
--
-- Database: `FF`
--
CREATE DATABASE IF NOT EXISTS `FF` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `FF`;

-- --------------------------------------------------------

--
-- Table structure for table `PhysicalFlows`
--

CREATE TABLE `PhysicalFlows` (
  `outMapCode` varchar(2) NOT NULL,
  `inMapCode` varchar(2) NOT NULL,
  `flowValue` float,
  `updateTime` datetime NOT NULL,
  `dateTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `PhysicalFlows`
--
ALTER TABLE `PhysicalFlows`
  ADD PRIMARY KEY (`outMapCode`,`inMapCode`,`updateTime`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
