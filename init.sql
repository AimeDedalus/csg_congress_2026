CREATE DATABASE IF NOT EXISTS congress_db;
USE congress_db;

-- 1. Tabla de Usuarios (Auth y Roles)
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('superadmin', 'admin', 'regular') NOT NULL
);

INSERT IGNORE INTO users (username, password, role) VALUES 
('superadmin', 'super123', 'superadmin'),
('admin', 'admin123', 'admin'),
('staff', 'staff123', 'regular');

-- 2. Tabla de Países
CREATE TABLE IF NOT EXISTS countries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

INSERT IGNORE INTO countries (name) VALUES 
('Argentina'), ('Bolivia'), ('Brazil'), ('Canada'), ('Chile'), 
('Colombia'), ('Costa Rica'), ('Cuba'), ('Dominican Republic'), 
('Ecuador'), ('El Salvador'), ('Guatemala'), ('Honduras'), 
('Mexico'), ('Nicaragua'), ('Panama'), ('Paraguay'), ('Peru'), 
('Puerto Rico'), ('United States'), ('Uruguay'), ('Venezuela'), 
('Other');

-- 3. Tabla de Tipos de Documento
CREATE TABLE IF NOT EXISTS document_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) UNIQUE NOT NULL
);

INSERT IGNORE INTO document_types (name) VALUES 
('CC'), ('CE'), ('NIT'), ('PPT'), ('Pasaporte'), ('Otro');

-- 4. Tabla de Asistentes (ACTUALIZADA CON SEXO E IGLESIA)
CREATE TABLE IF NOT EXISTS attendees (
  ticket VARCHAR(50) PRIMARY KEY,
  id_doc_type VARCHAR(20) NOT NULL DEFAULT 'CC',
  id_doc VARCHAR(50) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  sex ENUM('Masculino', 'Femenino') NOT NULL,
  church VARCHAR(200),
  address VARCHAR(200),
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(50),
  country VARCHAR(100) NOT NULL,
  role ENUM('Pastor', 'Leader', 'Cordinador', 'Voluntario', 'Public') NOT NULL,
  observations TEXT,
  is_present BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabla de Registro de Actividad
CREATE TABLE IF NOT EXISTS activity_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  action VARCHAR(100) NOT NULL,
  details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
