-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 25, 2024 at 02:26 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `PROPERTYMANAGEMENT`
--

-- --------------------------------------------------------

--
-- Table structure for table `Leases`
--

CREATE TABLE `Leases` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `emailid` varchar(255) DEFAULT NULL,
  `StartingDate` date DEFAULT NULL,
  `EndingDate` date DEFAULT NULL,
  `RentAmount` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Leases`
--

INSERT INTO `Leases` (`id`, `name`, `emailid`, `StartingDate`, `EndingDate`, `RentAmount`, `createdAt`, `updatedAt`) VALUES
(4, 'Jessica Gentry', 'kefi@mailinator.com', '2024-02-06', '2024-02-13', 2500, '2024-01-25 11:07:00', '2024-01-25 13:06:13'),
(5, 'Hedley Beard', 'qugaweni@mailinator.com', '2024-01-30', '2024-02-01', 1500, '2024-01-25 12:48:35', '2024-01-25 13:05:55');

-- --------------------------------------------------------

--
-- Table structure for table `Properties`
--

CREATE TABLE `Properties` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `available_rooms` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Properties`
--

INSERT INTO `Properties` (`id`, `name`, `address`, `available_rooms`, `createdAt`, `updatedAt`) VALUES
(4, 'Shree mahalaxmi Bhavan', '9/568,B,Party port ,Surat', 5, '2024-01-24 12:39:25', '2024-01-24 12:39:25'),
(6, 'Tridev Bhavan', 'Nanpura', 10, '2024-01-25 04:51:16', '2024-01-25 06:02:03'),
(7, 'Zane Buckley', 'Nanpura,Surat', 3, '2024-01-25 06:03:22', '2024-01-25 06:03:22');

-- --------------------------------------------------------

--
-- Table structure for table `PropertyLeasers`
--

CREATE TABLE `PropertyLeasers` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `LeaseId` int(11) DEFAULT NULL,
  `PropertyId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `PropertyLeasers`
--

INSERT INTO `PropertyLeasers` (`id`, `createdAt`, `updatedAt`, `LeaseId`, `PropertyId`) VALUES
(4, '2024-01-25 11:07:00', '2024-01-25 13:06:13', 4, 4),
(5, '2024-01-25 12:48:35', '2024-01-25 13:05:55', 5, 6);

-- --------------------------------------------------------

--
-- Table structure for table `PropertyTenants`
--

CREATE TABLE `PropertyTenants` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PropertyId` int(11) DEFAULT NULL,
  `TenantId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `PropertyTenants`
--

INSERT INTO `PropertyTenants` (`id`, `createdAt`, `updatedAt`, `PropertyId`, `TenantId`) VALUES
(1, '2024-01-24 12:39:25', '2024-01-24 12:39:25', 4, 34),
(2, '2024-01-24 12:39:25', '2024-01-24 12:39:25', 4, 35),
(3, '2024-01-24 12:39:25', '2024-01-24 12:39:25', 4, 57),
(8, '2024-01-25 06:02:03', '2024-01-25 06:02:03', 6, 34),
(9, '2024-01-25 06:02:03', '2024-01-25 06:02:03', 6, 57),
(10, '2024-01-25 06:03:22', '2024-01-25 06:03:22', 7, 33),
(11, '2024-01-25 06:03:22', '2024-01-25 06:03:22', 7, 35);

-- --------------------------------------------------------

--
-- Table structure for table `Tenants`
--

CREATE TABLE `Tenants` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `emailid` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Tenants`
--

INSERT INTO `Tenants` (`id`, `name`, `emailid`, `createdAt`, `updatedAt`) VALUES
(32, 'May Walton', 'bece@mailinator.com', '2024-01-24 09:17:06', '2024-01-24 09:48:59'),
(33, 'Charles Matthews', 'velox@mailinator.com', '2024-01-24 09:17:14', '2024-01-24 09:50:29'),
(34, 'Chase Lucas', 'doxi@mailinator.com', '2024-01-24 09:30:51', '2024-01-24 09:56:09'),
(35, 'Ali Wiggins', 'nymofaxeh@mailinator.com', '2024-01-24 09:31:40', '2024-01-24 09:52:04'),
(57, 'Clare Fischer', 'xycicu@mailinator.com', '2024-01-24 09:53:33', '2024-01-24 09:53:33'),
(59, 'Herman Winters', 'gyxyde@mailinator.com', '2024-01-24 11:45:53', '2024-01-24 11:45:53'),
(60, 'Ashton Levy', 'mejy@mailinator.com', '2024-01-24 11:46:04', '2024-01-24 11:46:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Leases`
--
ALTER TABLE `Leases`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Properties`
--
ALTER TABLE `Properties`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `address` (`address`);

--
-- Indexes for table `PropertyLeasers`
--
ALTER TABLE `PropertyLeasers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `LeaseId` (`LeaseId`),
  ADD KEY `PropertyId` (`PropertyId`);

--
-- Indexes for table `PropertyTenants`
--
ALTER TABLE `PropertyTenants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PropertyId` (`PropertyId`),
  ADD KEY `TenantId` (`TenantId`);

--
-- Indexes for table `Tenants`
--
ALTER TABLE `Tenants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `emailid` (`emailid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Leases`
--
ALTER TABLE `Leases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Properties`
--
ALTER TABLE `Properties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `PropertyLeasers`
--
ALTER TABLE `PropertyLeasers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `PropertyTenants`
--
ALTER TABLE `PropertyTenants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `Tenants`
--
ALTER TABLE `Tenants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `PropertyLeasers`
--
ALTER TABLE `PropertyLeasers`
  ADD CONSTRAINT `PropertyLeasers_ibfk_1` FOREIGN KEY (`LeaseId`) REFERENCES `Leases` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `PropertyLeasers_ibfk_2` FOREIGN KEY (`PropertyId`) REFERENCES `Properties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `PropertyTenants`
--
ALTER TABLE `PropertyTenants`
  ADD CONSTRAINT `PropertyTenants_ibfk_1` FOREIGN KEY (`PropertyId`) REFERENCES `Properties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `PropertyTenants_ibfk_2` FOREIGN KEY (`TenantId`) REFERENCES `Tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
