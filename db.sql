-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.1.35-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win32
-- HeidiSQL Versión:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
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
  `norma` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `auditor` int(11) NOT NULL,
  KEY `PK_auditoria` (`id`),
  KEY `FK_auditoria_usuario` (`auditor`),
  KEY `FK_auditoria_normas` (`norma`),
  KEY `FK_auditoria_empresas` (`empresa`),
  CONSTRAINT `id_empresa` FOREIGN KEY (`empresa`) REFERENCES `empresa` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_norma` FOREIGN KEY (`norma`) REFERENCES `norma` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_usuarioauditor` FOREIGN KEY (`auditor`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla db_auditoria.auditoria: ~0 rows (aproximadamente)
DELETE FROM `auditoria`;
/*!40000 ALTER TABLE `auditoria` DISABLE KEYS */;
/*!40000 ALTER TABLE `auditoria` ENABLE KEYS */;

-- Volcando estructura para tabla db_auditoria.auditoria_pregunta
DROP TABLE IF EXISTS `auditoria_pregunta`;
CREATE TABLE IF NOT EXISTS `auditoria_pregunta` (
  `auditoria` int(11) NOT NULL,
  `pregunta` int(11) NOT NULL,
  `respuesta` varchar(3) NOT NULL,
  KEY `id_auditoria` (`auditoria`),
  KEY `id_pregunta` (`pregunta`),
  CONSTRAINT `id_auditoria` FOREIGN KEY (`auditoria`) REFERENCES `auditoria` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_pregunta` FOREIGN KEY (`pregunta`) REFERENCES `pregunta` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla db_auditoria.auditoria_pregunta: ~0 rows (aproximadamente)
DELETE FROM `auditoria_pregunta`;
/*!40000 ALTER TABLE `auditoria_pregunta` DISABLE KEYS */;
/*!40000 ALTER TABLE `auditoria_pregunta` ENABLE KEYS */;

-- Volcando estructura para tabla db_auditoria.empresa
DROP TABLE IF EXISTS `empresa`;
CREATE TABLE IF NOT EXISTS `empresa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `nit` varchar(100) NOT NULL,
  UNIQUE KEY `nombreEmpresa` (`nombre`),
  KEY `PK_empresas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla db_auditoria.empresa: ~7 rows (aproximadamente)
DELETE FROM `empresa`;
/*!40000 ALTER TABLE `empresa` DISABLE KEYS */;
INSERT INTO `empresa` (`id`, `nombre`, `nit`) VALUES
	(3, 'emtelco', '123'),
	(2, 'Facebook', '1001'),
	(5, 'Fundaciòn brazos abiertos', '123123123'),
	(6, 'Genius', '969696'),
	(1, 'Google', '100000001'),
	(9, 'GW', '23'),
	(7, 'Microsoft', '969696'),
	(4, 'Mimos', '123'),
	(8, 'Samsung', '00000');
/*!40000 ALTER TABLE `empresa` ENABLE KEYS */;

-- Volcando estructura para tabla db_auditoria.norma
DROP TABLE IF EXISTS `norma`;
CREATE TABLE IF NOT EXISTS `norma` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  KEY `PK_normas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla db_auditoria.norma: ~3 rows (aproximadamente)
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

-- Volcando datos para la tabla db_auditoria.pregunta: ~3 rows (aproximadamente)
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla db_auditoria.usuarios: ~5 rows (aproximadamente)
DELETE FROM `usuarios`;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`id`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
	(1, 'walter', '123', '2018-09-07 20:18:19', '2018-09-07 20:18:19'),
	(2, 'camilo', '123', '2018-09-07 20:21:05', '2018-09-07 20:21:05'),
	(3, 'andres', '123', '2018-09-07 20:21:26', '2018-09-07 20:21:26'),
	(4, 'jose', '1234', '2018-09-07 20:47:40', '2018-09-07 20:47:40'),
	(7, 'julio', '123', '2018-09-07 21:43:34', '2018-09-07 21:43:34'),
	(8, 'camila', '123', '2018-09-11 01:19:19', '2018-09-11 01:19:19');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
