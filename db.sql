CREATE DATABASE proyecto_mcdu;
USE proyecto_mcdu;

CREATE TABLE Usuario (
  ID_Usuario INT PRIMARY KEY AUTO_INCREMENT,
  Correo VARCHAR(100) UNIQUE NOT NULL,
  Contraseña VARCHAR(255) NOT NULL,
  Tipo_Usuario ENUM('admin', 'Piloto', 'Aspirante') NOT NULL
);


INSERT INTO Usuario (Correo, Contraseña, Tipo_Usuario)
VALUES ('admin@correo.com', 'admin123', 'admin');



-- ELIMNAR REGISTROS = DELETE FROM Usuario WHERE ID_Usuario = 1;
-- por la id




CREATE TABLE Empresa (
ID_Empresa INT PRIMARY KEY AUTO_INCREMENT,
Nombre_Empresa VARCHAR(100) NOT NULL
);
-- Tabla: Aeronave
CREATE TABLE Aeronave (
ID_Avion INT PRIMARY KEY AUTO_INCREMENT,
Operativo VARCHAR(50) NOT NULL,
Tipo VARCHAR(50),
ID_Empresa INT,
FOREIGN KEY (ID_Empresa) REFERENCES Empresa(ID_Empresa)
);
-- Tabla: Emergencias
CREATE TABLE Emergencias (
ID_Emergencia INT PRIMARY KEY AUTO_INCREMENT,
Aeropuerto_Alterno VARCHAR(120),
Combustible_Extra VARCHAR(100),
Ruta VARCHAR(110)
);
-- Tabla: Piloto / Tripulación
CREATE TABLE Tripulacion (
ID_Piloto INT PRIMARY KEY AUTO_INCREMENT,
Nombre VARCHAR(100) NOT NULL ,
ID_Empresa INT ,
Direccion VARCHAR(100) NOT NULL,
FOREIGN KEY (ID_Empresa) REFERENCES Empresa(ID_Empresa) ON DELETE CASCADE
);
-- Tabla: Contacto de Tripulación
CREATE TABLE Contacto_Tripulacion (
ID_Contacto INT PRIMARY KEY AUTO_INCREMENT,
ID_Piloto INT,
Telefono VARCHAR(30) UNIQUE NOT NULL,
Correo VARCHAR(100) NOT NULL,
FOREIGN KEY (ID_Piloto) REFERENCES Tripulacion(ID_Piloto) ON DELETE CASCADE
);
-- Tabla: Características de la Aeronave
CREATE TABLE Caracteristicas_Aeronave (
ID_Caracteristica INT PRIMARY KEY AUTO_INCREMENT,
ID_Avion INT,
Num_Pasajeros INT,
Altitud VARCHAR(70) NOT NULL ,
Peso_Pasajeros VARCHAR(70) NOT NULL,
Combustible VARCHAR(70) NOT NULL,
Peso_Bodega VARCHAR(70)NOT NULL,
FOREIGN KEY (ID_Avion) REFERENCES Aeronave(ID_Avion) ON DELETE CASCADE
);
-- Tabla: Vuelo
CREATE TABLE Vuelo (
ID_Vuelo INT PRIMARY KEY AUTO_INCREMENT,
ID_Avion INT,
FOREIGN KEY (ID_Avion) REFERENCES Aeronave(ID_Avion)ON DELETE CASCADE
);
-- Tabla: Detalle de Vuelo
CREATE TABLE Detalle_Vuelo (
ID_Detalle INT PRIMARY KEY AUTO_INCREMENT,
ID_Vuelo INT,
Salida VARCHAR(50)NOT NULL,
Llegada VARCHAR(50)NOT NULL,
Distancia VARCHAR(30) NOT NULL,
Tiempo VARCHAR(60) NOT NULL,
FOREIGN KEY (ID_Vuelo) REFERENCES Vuelo(ID_Vuelo) ON DELETE CASCADE
);
-- Tabla: Ruta (relación vuelo-emergencia) pivote
CREATE TABLE Ruta (
ID_Ruta INT PRIMARY KEY AUTO_INCREMENT,
ID_Vuelo INT,
ID_Emergencia INT,
FOREIGN KEY (ID_Vuelo) REFERENCES Vuelo(ID_Vuelo) ON DELETE CASCADE ,
FOREIGN KEY (ID_Emergencia) REFERENCES Emergencias(ID_Emergencia) ON DELETE CASCADE
);