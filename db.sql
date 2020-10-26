/*
SQLyog Community v13.1.7 (64 bit)
MySQL - 10.4.13-MariaDB : Database - stall_db
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`stall_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `stall_db`;

/*Table structure for table `products` */

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image_t` varchar(255) DEFAULT NULL,
  `image_p` varchar(255) DEFAULT NULL,
  `list_price` int(11) DEFAULT NULL,
  `old_price` int(11) DEFAULT 0,
  `stock` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `delete_status` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `products` */

insert  into `products`(`id`,`name`,`description`,`image_t`,`image_p`,`list_price`,`old_price`,`stock`,`status`,`delete_status`) values 
(1,'parava','parava',NULL,NULL,20,0,20,1,0),
(2,'kilimeen','kilimeen',NULL,NULL,40,0,20,1,0),
(3,'karimeen','karimeen',NULL,NULL,60,0,20,1,0);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
