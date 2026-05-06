-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: localhost    Database: congress_db
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activity_logs`
--

DROP TABLE IF EXISTS `activity_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `action` varchar(100) NOT NULL,
  `details` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_logs`
--

LOCK TABLES `activity_logs` WRITE;
/*!40000 ALTER TABLE `activity_logs` DISABLE KEYS */;
INSERT INTO `activity_logs` VALUES (1,'superadmin','INICIO_SESION','El usuario superadmin ingresó al sistema.','2026-05-04 20:22:40'),(2,'superadmin','INICIO_SESION','El usuario superadmin ingresó al sistema.','2026-05-04 20:28:05'),(3,'superadmin','RESTAURAR_RESPALDO','Restauró la base de datos completa desde un archivo JSON.','2026-05-04 20:28:44'),(4,'admin','INICIO_SESION','El usuario admin ingresó al sistema.','2026-05-04 20:52:46'),(5,'superadmin','INICIO_SESION','El usuario superadmin ingresó al sistema.','2026-05-04 21:22:40'),(6,'superadmin','EDITAR_USUARIO','Actualizó el usuario ID #1 (Nuevo Nombre: superadmin, Rol: superadmin). Se cambió la contraseña.','2026-05-04 21:23:21'),(7,'superadmin','CREAR_USUARIO','Creó un nuevo usuario: Aime con rol superadmin.','2026-05-04 21:23:33'),(8,'superadmin','CREAR_USUARIO','Creó un nuevo usuario: Alessandra con rol regular.','2026-05-04 21:23:46'),(9,'superadmin','CREAR_USUARIO','Creó un nuevo usuario: Meio con rol admin.','2026-05-04 21:24:02'),(10,'Meio','INICIO_SESION','El usuario Meio ingresó al sistema.','2026-05-04 21:45:10'),(11,'superadmin','INICIO_SESION','El usuario superadmin ingresó al sistema.','2026-05-04 21:46:11'),(12,'admin','INICIO_SESION','El usuario admin ingresó al sistema.','2026-05-04 21:46:42'),(13,'Aime','INICIO_SESION','El usuario Aime ingresó al sistema.','2026-05-04 21:50:53'),(14,'Aime','INICIO_SESION','El usuario Aime ingresó al sistema.','2026-05-04 21:58:26'),(15,'Aime','INICIO_SESION','El usuario Aime ingresó al sistema.','2026-05-04 22:21:04'),(16,'Aime','INICIO_SESION','El usuario Aime ingresó al sistema.','2026-05-04 23:14:28'),(17,'Meio','INICIO_SESION','El usuario Meio ingresó al sistema.','2026-05-04 23:15:05'),(18,'Aime','INICIO_SESION','El usuario Aime ingresó al sistema.','2026-05-04 23:15:17'),(19,'Aime','INICIO_SESION','El usuario Aime ingresó al sistema.','2026-05-04 23:18:44'),(20,'Aime','INICIO_SESION','El usuario Aime ingresó al sistema.','2026-05-05 01:36:23'),(21,'Aime','RESTAURAR_RESPALDO','Restauró la base de datos completa desde un archivo JSON.','2026-05-05 01:36:41'),(22,'Aime','INICIO_SESION','El usuario Aime ingresó al sistema.','2026-05-05 02:20:53'),(23,'Aime','INICIO_SESION','El usuario Aime ingresó al sistema.','2026-05-05 02:21:16'),(24,'Aime','NUEVO_REGISTRO','Registró al asistente Aime Maestracci (Ticket: 1-100).','2026-05-05 12:34:27'),(25,'Aime','MODIFICACION','Modificó los datos del asistente con Ticket: 1-100.','2026-05-05 14:04:57'),(26,'Aime','ELIMINACION','Eliminó permanentemente el Ticket: 1-100.','2026-05-05 14:05:04'),(27,'Aime','NUEVO_REGISTRO','Registró al asistente Aime Maestracci (Ticket: 1-100).','2026-05-05 20:13:23'),(28,'Aime','ELIMINACION','Eliminó permanentemente el Ticket: 1-100.','2026-05-05 20:13:30'),(29,'Aime','INICIO_SESION','El usuario Aime ingresó al sistema.','2026-05-05 22:49:37'),(30,'Aime','EDITAR_USUARIO','Actualizó el usuario ID #1 (Nuevo Nombre: superadmin, Rol: superadmin). Se cambió la contraseña.','2026-05-05 22:49:52'),(31,'Aime','EDITAR_USUARIO','Actualizó el usuario ID #1 (Nuevo Nombre: superadmin, Rol: superadmin). Se cambió la contraseña.','2026-05-05 22:50:10'),(32,'Aime','EDITAR_USUARIO','Actualizó el usuario ID #2 (Nuevo Nombre: admin, Rol: admin). Se cambió la contraseña.','2026-05-05 22:50:27'),(33,'Aime','EDITAR_USUARIO','Actualizó el usuario ID #3 (Nuevo Nombre: staff, Rol: regular). Se cambió la contraseña.','2026-05-05 22:50:41'),(34,'Aime','EDITAR_USUARIO','Actualizó el usuario ID #4 (Nuevo Nombre: Aime, Rol: superadmin). Se cambió la contraseña.','2026-05-05 22:51:11'),(35,'Aime','EDITAR_USUARIO','Actualizó el usuario ID #5 (Nuevo Nombre: Alessandra, Rol: regular). Se cambió la contraseña.','2026-05-05 22:51:24'),(36,'Aime','EDITAR_USUARIO','Actualizó el usuario ID #6 (Nuevo Nombre: Meio, Rol: admin). Se cambió la contraseña.','2026-05-05 22:51:37'),(37,'Aime','INICIO_SESION','El usuario Aime ingresó al sistema.','2026-05-05 22:51:56'),(38,'Aime','INICIO_SESION','El usuario Aime ingresó al sistema.','2026-05-05 23:01:43'),(39,'Aime','EDITAR_USUARIO','Actualizó el usuario ID #6 (Nuevo Nombre: Meio, Rol: regular). Se cambió la contraseña.','2026-05-05 23:02:06'),(40,'Meio','INICIO_SESION','El usuario Meio ingresó al sistema.','2026-05-05 23:02:18'),(41,'Aime','INICIO_SESION','El usuario Aime ingresó al sistema.','2026-05-05 23:02:33'),(42,'Aime','INICIO_SESION','El usuario Aime ingresó al sistema.','2026-05-06 00:22:28'),(43,'Meio','INICIO_SESION','El usuario Meio ingresó al sistema.','2026-05-06 00:23:26'),(44,'Aime','INICIO_SESION','El usuario Aime ingresó al sistema.','2026-05-06 00:45:06'),(45,'Aime','INICIO_SESION','El usuario Aime ingresó al sistema.','2026-05-06 00:47:45'),(46,'Aime','INICIO_SESION','El usuario Aime ingresó al sistema.','2026-05-06 14:36:35');
/*!40000 ALTER TABLE `activity_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendees`
--

DROP TABLE IF EXISTS `attendees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendees` (
  `ticket` varchar(50) NOT NULL,
  `id_doc_type` varchar(20) NOT NULL DEFAULT 'CC',
  `id_doc` varchar(50) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `sex` enum('Masculino','Femenino') NOT NULL,
  `church` varchar(200) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `country` varchar(100) NOT NULL,
  `role` enum('Pastor','Leader','Cordinador','Voluntario','Public') NOT NULL,
  `observations` text,
  `is_present` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ticket`),
  UNIQUE KEY `id_doc` (`id_doc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendees`
--

LOCK TABLES `attendees` WRITE;
/*!40000 ALTER TABLE `attendees` DISABLE KEYS */;
INSERT INTO `attendees` VALUES ('0000046800','CC','1128467397','Natalia Andrea','Sanchez','Femenino','Centro de Fe y Esperanza de Pedregal','Calle 100a 76 10 Medellin','nata1388.dance@gmail.com','S/N','Colombia','Leader','',0,'2026-05-05 01:36:41'),('TRYhVCCxYkEC','CC','1037625241','Daniel','Jiménez Osorio','Masculino','Cenfol CGC','Cra 32 #77 Sur - 205','crewx360@gmail.com','+583005269353','Colombia','Public','P:100.000',0,'2026-05-05 01:36:41');
/*!40000 ALTER TABLE `attendees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` VALUES (1,'Argentina'),(2,'Bolivia'),(3,'Brazil'),(4,'Canada'),(5,'Chile'),(6,'Colombia'),(7,'Costa Rica'),(8,'Cuba'),(9,'Dominican Republic'),(10,'Ecuador'),(11,'El Salvador'),(12,'Guatemala'),(13,'Honduras'),(14,'Mexico'),(15,'Nicaragua'),(23,'Other'),(16,'Panama'),(17,'Paraguay'),(18,'Peru'),(19,'Puerto Rico'),(20,'United States'),(21,'Uruguay'),(22,'Venezuela');
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document_types`
--

DROP TABLE IF EXISTS `document_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document_types`
--

LOCK TABLES `document_types` WRITE;
/*!40000 ALTER TABLE `document_types` DISABLE KEYS */;
INSERT INTO `document_types` VALUES (1,'CC'),(2,'CE'),(3,'NIT'),(6,'Otro'),(5,'Pasaporte'),(4,'PPT');
/*!40000 ALTER TABLE `document_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('superadmin','admin','regular') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'superadmin','@superunity5836cl@','superadmin'),(2,'admin','@adminunity5836cl@','admin'),(3,'staff','@staffunity5836cl@','regular'),(4,'Aime','@aimeunity5836cl@','superadmin'),(5,'Alessandra','@alessandraunity5836cl@','regular'),(6,'Meio','meio123','regular');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-06 14:59:19
