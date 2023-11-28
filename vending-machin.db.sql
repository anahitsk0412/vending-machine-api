-- Adminer 4.8.1 MySQL 5.5.5-10.5.8-MariaDB-1:10.5.8+maria~focal dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `buyerId` int(11) NOT NULL,
  `sellerId` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;


DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_520_ci NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `amountAvailable` int(11) NOT NULL,
  `sellerId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_d5cac481d22dacaf4d53f900a3f` (`sellerId`),
  CONSTRAINT `FK_d5cac481d22dacaf4d53f900a3f` FOREIGN KEY (`sellerId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

INSERT INTO `product` (`id`, `name`, `cost`, `amountAvailable`, `sellerId`) VALUES
(1,	'chockolate bar',	1.25,	7,	2),
(2,	'orange juice',	1.95,	4,	2),
(3,	'still water',	1.50,	10,	2);

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_520_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_520_ci NOT NULL,
  `deposit` decimal(10,2) NOT NULL DEFAULT 0.00,
  `role` varchar(255) COLLATE utf8_unicode_520_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

INSERT INTO `user` (`id`, `username`, `password`, `deposit`, `role`) VALUES
(1,	'admin1',	'1defcb8ee976c8d5.944a7a756a9d6cb0b32cf3a7f9db89d80b67563f74d2288a4f5f65d00e771328	',	0.00,	'admin'),
(2,	'seller1',	'1defcb8ee976c8d5.944a7a756a9d6cb0b32cf3a7f9db89d80b67563f74d2288a4f5f65d00e771328	',	0.00,	'seller'),
(3,	'buyer1',	'1defcb8ee976c8d5.944a7a756a9d6cb0b32cf3a7f9db89d80b67563f74d2288a4f5f65d00e771328	',	0.00,	'buyer');

-- 2023-11-28 19:11:06
