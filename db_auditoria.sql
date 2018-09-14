-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.1.34-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win32
-- HeidiSQL Versión:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando estructura de base de datos para db_auditoria
DROP DATABASE IF EXISTS `db_auditoria`;
CREATE DATABASE IF NOT EXISTS `db_auditoria` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `db_auditoria`;


-- Volcando estructura para tabla db_auditoria.auditoria
DROP TABLE IF EXISTS `auditoria`;
CREATE TABLE IF NOT EXISTS `auditoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empresa` int(11) NOT NULL,
  `pregunta` int(11) NOT NULL,
  `respuesta` varchar(10) DEFAULT NULL,
  `norma` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `auditor` int(11) NOT NULL,
  KEY `PK_auditoria` (`id`),
  KEY `FK_auditoria_usuario` (`auditor`),
  KEY `FK_auditoria_normas` (`norma`),
  KEY `FK_auditoria_preguntas` (`pregunta`),
  KEY `FK_auditoria_empresas` (`empresa`),
  CONSTRAINT `FK_auditoria_empresas` FOREIGN KEY (`empresa`) REFERENCES `empresa` (`id`),
  CONSTRAINT `FK_auditoria_normas` FOREIGN KEY (`norma`) REFERENCES `norma` (`id`),
  CONSTRAINT `FK_auditoria_preguntas` FOREIGN KEY (`pregunta`) REFERENCES `pregunta` (`id`),
  CONSTRAINT `FK_auditoria_usuario` FOREIGN KEY (`auditor`) REFERENCES `usuario` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla db_auditoria.auditoria: ~4 rows (aproximadamente)
DELETE FROM `auditoria`;
/*!40000 ALTER TABLE `auditoria` DISABLE KEYS */;
INSERT INTO `auditoria` (`id`, `empresa`, `pregunta`, `respuesta`, `norma`, `fecha`, `auditor`) VALUES
	(1, 1, 1, '1', 2, '2018-09-06 03:21:21', 1),
	(2, 2, 1, '1', 2, '2018-09-06 03:21:21', 1),
	(3, 1, 2, '1', 2, '2018-09-06 14:44:04', 1),
	(4, 1, 2, '1', 1, '2018-09-06 14:45:43', 1);
/*!40000 ALTER TABLE `auditoria` ENABLE KEYS */;


-- Volcando estructura para tabla db_auditoria.empresa
DROP TABLE IF EXISTS `empresa`;
CREATE TABLE IF NOT EXISTS `empresa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `nit` varchar(100) NOT NULL,
  KEY `PK_empresas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla db_auditoria.empresa: ~3 rows (aproximadamente)
DELETE FROM `empresa`;
/*!40000 ALTER TABLE `empresa` DISABLE KEYS */;
INSERT INTO `empresa` (`id`, `nombre`, `nit`) VALUES
	(1, 'Google', '100000001'),
	(2, 'Facebook', '1001'),
	(3, 'emtelco', '123');
/*!40000 ALTER TABLE `empresa` ENABLE KEYS */;


-- Volcando estructura para tabla db_auditoria.norma
DROP TABLE IF EXISTS `norma`;
CREATE TABLE IF NOT EXISTS `norma` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  KEY `PK_normas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla db_auditoria.norma: ~2 rows (aproximadamente)
DELETE FROM `norma`;
/*!40000 ALTER TABLE `norma` DISABLE KEYS */;
INSERT INTO `norma` (`id`, `nombre`) VALUES
	(1, 'ISO 20000'),
	(2, 'ITIL'),
	(3, 'ISO 20001');
/*!40000 ALTER TABLE `norma` ENABLE KEYS */;


-- Volcando estructura para tabla db_auditoria.pregunta
DROP TABLE IF EXISTS `pregunta`;
CREATE TABLE IF NOT EXISTS `pregunta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `texto` varchar(100) NOT NULL,
  `norma` int(11) NOT NULL,
  KEY `PK_preguntas` (`id`),
  KEY `FK_preguntas_normas` (`norma`),
  CONSTRAINT `FK_preguntas_normas` FOREIGN KEY (`norma`) REFERENCES `norma` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla db_auditoria.pregunta: ~2 rows (aproximadamente)
DELETE FROM `pregunta`;
/*!40000 ALTER TABLE `pregunta` DISABLE KEYS */;
INSERT INTO `pregunta` (`id`, `texto`, `norma`) VALUES
	(1, '1 = 1', 2),
	(2, '2=2', 2),
	(4, 'a=a', 1);
/*!40000 ALTER TABLE `pregunta` ENABLE KEYS */;


-- Volcando estructura para tabla db_auditoria.usuarios
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla db_auditoria.usuarios: ~3 rows (aproximadamente)
DELETE FROM `usuarios`;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`id`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
	(1, 'walter', '123', '2018-09-07 20:18:19', '2018-09-07 20:18:19'),
	(2, 'camilo', '123', '2018-09-07 20:21:05', '2018-09-07 20:21:05'),
	(3, 'andres', '123', '2018-09-07 20:21:26', '2018-09-07 20:21:26'),
	(4, 'jose', '1234', '2018-09-07 20:47:40', '2018-09-07 20:47:40'),
	(7, 'julio', '123', '2018-09-07 21:43:34', '2018-09-07 21:43:34');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
