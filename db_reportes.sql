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

-- Volcando estructura de base de datos para db_reportes
DROP DATABASE IF EXISTS `db_reportes`;
CREATE DATABASE IF NOT EXISTS `db_reportes` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `db_reportes`;


-- Volcando estructura para tabla db_reportes.actividad
DROP TABLE IF EXISTS `actividad`;
CREATE TABLE IF NOT EXISTS `actividad` (
  `id_actividad` int(11) NOT NULL AUTO_INCREMENT,
  `id_analista` int(11),
  `id_cliente` int(11),
  `id_frecuencia` int(11),
  `nombre` varchar(100) DEFAULT NULL,
  `tiempo_ejecucion` float,
  `ans_hora` varchar(8),
  `ans_dias` int(11),
  PRIMARY KEY (`id_actividad`) USING BTREE,
  KEY `FK_analista` (`id_analista`),
  KEY `FK_cliente` (`id_cliente`),
  KEY `FK_frecuencia` (`id_frecuencia`),
  CONSTRAINT `FK_analista` FOREIGN KEY (`id_analista`) REFERENCES `analista` (`id_analista`),
  CONSTRAINT `FK_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `FK_frecuencia` FOREIGN KEY (`id_frecuencia`) REFERENCES `frecuencia` (`id_frecuencia`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla db_reportes.actividad: ~2 rows (aproximadamente)
DELETE FROM `actividad`;
/*!40000 ALTER TABLE `actividad` DISABLE KEYS */;
INSERT INTO `actividad` (`id_actividad`, `id_analista`, `id_cliente`, `id_frecuencia`, `nombre`, `tiempo_ejecucion`, `ans_hora`, `ans_dias`) VALUES
	(1, 1, 8, 1, 'Forecasted', 3, '17:00', 0),
	(2, 2, 6, 8, 'Forecasted 2', 0.5, '12:00', 0);
/*!40000 ALTER TABLE `actividad` ENABLE KEYS */;


-- Volcando estructura para tabla db_reportes.analista
DROP TABLE IF EXISTS `analista`;
CREATE TABLE IF NOT EXISTS `analista` (
  `id_analista` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_red` varchar(50) NOT NULL,
  `nombres_completos` varchar(150) NOT NULL,
  PRIMARY KEY (`id_analista`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla db_reportes.analista: ~30 rows (aproximadamente)
DELETE FROM `analista`;
/*!40000 ALTER TABLE `analista` DISABLE KEYS */;
INSERT INTO `analista` (`id_analista`, `usuario_red`, `nombres_completos`) VALUES
	(1, 'jrestrch', 'Walter Restrepo'),
	(2, 'amenetor', 'Alexander Meneses Toro'),
	(3, 'aospinac', 'Alvaro Ancisar Ospina Cardenas'),
	(4, 'agrisalv', 'Andres Felipe Grisales Vahos'),
	(5, 'csilvaes', 'Carlos Enrique Silva Estrada'),
	(6, 'ccastri', 'Cesar Augusto Castro Rios'),
	(7, 'dmorenoc', 'Daniel Felipe Moreno Caro'),
	(8, 'dmartinb', 'Diego Andres Martin Benavides'),
	(9, 'dsolanoa', 'Duvan Solano'),
	(10, 'enavarrm', 'Erika Eugenia Navarro Montoya'),
	(11, 'fbohorqu', 'Fabio Hernan Bohorquez Alonso'),
	(12, 'jmonsval', 'Jhon Fredy Monsalve Valencia'),
	(13, 'jechevef', 'Jhon William Echeverri Flórez'),
	(14, 'jgomgome', 'Jorge Iván Gómez'),
	(15, 'jmartipa', 'Jorge Ivan Martinez Patiño'),
	(16, 'jmurielh', 'Jhonatan Muriel Henao'),
	(17, 'jalzatev', 'Juan Diego Alzate Vanegas'),
	(18, 'juarango', 'Julian Esteban Arango Siachoque'),
	(19, 'jmalagam', 'Julian Esteban Malagon Amazo'),
	(20, 'karangod', 'Karen Julieth Arango Delgado'),
	(21, 'cpena', 'Lestvia Del Carmen Peña Gonzalez'),
	(22, 'mcordor', 'Manuel Jose Cordoba Rios'),
	(23, 'mrodrre', 'Mónica Maria Rodriguez Restrepo'),
	(24, 'ncarvag', 'Néstor Iván Carvajal González'),
	(25, 'oclopez', 'Octavio López Ríos'),
	(26, 'omejialo', 'Oscar David Mejía Lopera'),
	(27, 'odiezv', 'Oscar Mario Diez Valencia'),
	(28, 'rmarinm', 'Robinson Marin Marin'),
	(29, 'rvelez', 'Rene Velez'),
	(30, 'dgomez', 'Diego Gomez');
/*!40000 ALTER TABLE `analista` ENABLE KEYS */;


-- Volcando estructura para tabla db_reportes.cliente
DROP TABLE IF EXISTS `cliente`;
CREATE TABLE IF NOT EXISTS `cliente` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id_cliente`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla db_reportes.cliente: ~50 rows (aproximadamente)
DELETE FROM `cliente`;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` (`id_cliente`, `nombre`) VALUES
	(1, 'ADM'),
	(2, 'ADMINISTRATIVO'),
	(3, 'AEX'),
	(4, 'AKB'),
	(5, 'BELCORP'),
	(6, 'CCE'),
	(7, 'CCM'),
	(8, 'CENS'),
	(9, 'CHEC'),
	(10, 'CIRCULO DE VIAJES UNIVERSAL S.A'),
	(11, 'COFI'),
	(12, 'COLOMBIA_MOVIL'),
	(13, 'COLPENSIONES BEPS'),
	(14, 'COMFAMA'),
	(15, 'COMPAÑIA DE FINANCIAMIENTO TUYA S.A.'),
	(16, 'CONCONCRETO'),
	(17, 'CONFIAR'),
	(18, 'DIAN'),
	(19, 'EDATEL'),
	(20, 'EDEQ'),
	(21, 'EL COLOMBIANO'),
	(22, 'EMTELCO'),
	(23, 'EMVARIAS'),
	(24, 'EPM'),
	(25, 'ESSA'),
	(26, 'FEPEP'),
	(27, 'FIDU_BANCOLOMBIA_ISAGEN'),
	(28, 'FIDUBANISA'),
	(29, 'FLYTECH'),
	(30, 'GOB_ANT'),
	(31, 'GRUPO EXITO'),
	(32, 'LABORATORIO ECHAVARRIA'),
	(33, 'LINEA 1'),
	(34, 'LINEA DIRECTA'),
	(35, 'LOS OLIVOS'),
	(36, 'MABE'),
	(37, 'METRO'),
	(38, 'MIGRACION COLOMBIA'),
	(39, 'MILLICOM'),
	(40, 'MINISTERIO DE COMERCIO'),
	(41, 'MUNICIPIO_MEDELLIN'),
	(42, 'NOVAVENTA'),
	(43, 'Orbitel'),
	(44, 'PAPA JOHNS'),
	(45, 'PARMALAT'),
	(46, 'SISBEN'),
	(47, 'SOMOS STTR'),
	(48, 'TODOHOGAR'),
	(49, 'TUYA'),
	(50, 'UNE');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;


-- Volcando estructura para tabla db_reportes.frecuencia
DROP TABLE IF EXISTS `frecuencia`;
CREATE TABLE IF NOT EXISTS `frecuencia` (
  `id_frecuencia` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id_frecuencia`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla db_reportes.frecuencia: ~8 rows (aproximadamente)
DELETE FROM `frecuencia`;
/*!40000 ALTER TABLE `frecuencia` DISABLE KEYS */;
INSERT INTO `frecuencia` (`id_frecuencia`, `nombre`) VALUES
	(1, 'Diario'),
	(2, 'Mensual'),
	(3, 'A solicitud'),
	(4, 'Bimensual'),
	(5, 'Semanal'),
	(6, 'Trimestral'),
	(7, 'Semestral'),
	(8, 'Quincenal');
/*!40000 ALTER TABLE `frecuencia` ENABLE KEYS */;


-- Volcando estructura para tabla db_reportes.registro_actividad
DROP TABLE IF EXISTS `registro_actividad`;
CREATE TABLE IF NOT EXISTS `registro_actividad` (
  `id_registro` int(11) NOT NULL AUTO_INCREMENT,
  `id_actividad` int(11) NOT NULL,
  `Observaciones` varchar(500) DEFAULT NULL,
  `fecha_hora` datetime NOT NULL,
  PRIMARY KEY (`id_registro`),
  KEY `FK_Actividad` (`id_actividad`),
  CONSTRAINT `FK_Actividad` FOREIGN KEY (`id_actividad`) REFERENCES `actividad` (`id_actividad`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla db_reportes.registro_actividad: ~6 rows (aproximadamente)
DELETE FROM `registro_actividad`;
/*!40000 ALTER TABLE `registro_actividad` DISABLE KEYS */;
INSERT INTO `registro_actividad` (`id_registro`, `id_actividad`, `Observaciones`, `fecha_hora`) VALUES
	(1, 1, NULL, '2018-09-14 14:40:52'),
	(2, 1, 'Este es un texto de prueba Este es un texto de prueba Este es un texto de prueba Este es un texto de prueba Este es un texto de prueba Este es un texto de prueba Este es un texto de prueba', '2018-09-18 15:32:16'),
	(3, 1, 'Este es un texto de prueba Este es un texto de prueba Este es un texto de prueba Este es un texto de prueba Este es un texto de prueba Este es un texto de prueba Este es un texto de prueba', '2018-09-19 11:38:56'),
	(5, 1, 't', '2018-09-19 11:52:36'),
	(6, 1, 'ABCDEFGHI', '2018-09-19 11:54:01'),
	(7, 1, 'Nelson', '2018-09-19 11:54:28');
/*!40000 ALTER TABLE `registro_actividad` ENABLE KEYS */;


-- Volcando estructura para vista db_reportes.vw_registro_actividad
DROP VIEW IF EXISTS `vw_registro_actividad`;
-- Creando tabla temporal para superar errores de dependencia de VIEW
CREATE TABLE `vw_registro_actividad` (
	`Cliente` VARCHAR(100) NOT NULL COLLATE 'latin1_swedish_ci',
	`nombre` VARCHAR(100) NULL COLLATE 'latin1_swedish_ci',
	`tiempo_ejecucion` FLOAT NULL,
	`ans_hora` VARCHAR(8) NULL COLLATE 'latin1_swedish_ci',
	`ans_dias` INT(11) NULL,
	`analista` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`frecuencia` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`Observaciones` VARCHAR(500) NULL COLLATE 'latin1_swedish_ci',
	`fecha_hora` DATETIME NOT NULL
) ENGINE=MyISAM;


-- Volcando estructura para vista db_reportes.vw_registro_actividad
DROP VIEW IF EXISTS `vw_registro_actividad`;
-- Eliminando tabla temporal y crear estructura final de VIEW
DROP TABLE IF EXISTS `vw_registro_actividad`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `vw_registro_actividad` AS select cl.nombre as Cliente, ac.nombre, ac.tiempo_ejecucion, ac.ans_hora, ac.ans_dias, an.usuario_red as analista, fr.nombre as frecuencia, ra.Observaciones, ra.fecha_hora from registro_actividad ra
inner join actividad ac on ra.id_actividad = ac.id_actividad
inner join cliente cl on ac.id_cliente = cl.id_cliente
inner join analista an on ac.id_analista = an.id_analista
inner join frecuencia fr on ac.id_frecuencia = fr.id_frecuencia ;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
