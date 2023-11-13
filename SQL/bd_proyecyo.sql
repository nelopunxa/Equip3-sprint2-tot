-- Borrar base de datos
DROP DATABASE IF EXISTS db_proyecto;

-- Crear una base de datos
CREATE DATABASE IF NOT EXISTS db_proyecto;

-- Usar la base de datos creada
USE db_proyecto;

CREATE TABLE usuarios (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	tipo_usuario VARCHAR(225) NOT NULL,
	nombre VARCHAR(255) NOT NULL,
	apellido VARCHAR(255) NOT NULL,
	domicilio VARCHAR(255) NOT NULL,
	DNI VARCHAR(10) NOT NULL,
	INDEX (DNI),
	telefono VARCHAR(15) NOT NULL,
	razon_social VARCHAR(255) NOT NULL,
	correo_electronico VARCHAR(255) NOT NULL
);

CREATE TABLE Proveedor (
	ID INT PRIMARY KEY AUTO_INCREMENT,
	DNI VARCHAR(255),
	documento_LOPD VARCHAR(255),
	NIF_Gerente VARCHAR(255),
	documento_constitucion VARCHAR(255),
	CIF VARCHAR(255),
	certificado_cuenta_bancaria VARCHAR(255),
	domicilio_completo VARCHAR(255),
	telefono VARCHAR(20),
	nombre VARCHAR(255),
	correo_electronico VARCHAR(255)
);


CREATE TABLE Modelo (
    ID INT PRIMARY KEY,
    nombre VARCHAR(255),
    tipo_carburante VARCHAR(255),
    tipo_marcha VARCHAR(255),
    descripcion_comercial TEXT
);

CREATE TABLE Marca (
    ID INT PRIMARY KEY,
    nombre VARCHAR(255),
    id_modelo INT,
    FOREIGN KEY (id_modelo) REFERENCES Modelo(ID)
);

-- Crear una tabla "vehiculo"
CREATE TABLE IF NOT EXISTS vehiculo (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    matricula VARCHAR(10),
    color VARCHAR(50) NOT NULL,
    danos TEXT,
    modelo INT,
    tipo_carburante VARCHAR(50) NOT NULL,
    fecha_matriculacion DATE NOT NULL,
    kilometros INT NOT NULL,
    marca INT,
    descripcion TEXT,
    iva DECIMAL(5,2) NOT NULL,
    num_bastidor VARCHAR(50) NOT NULL,
    tipo_cambio VARCHAR(20) NOT NULL,
    precio_venta DECIMAL(10, 2) NOT NULL,
    precio_compra DECIMAL(10, 2) NOT NULL,
    id_comanda INT,
    id_proveedor INT,
    FOREIGN KEY (modelo) REFERENCES Modelo(ID),
    FOREIGN KEY (marca) REFERENCES Marca(ID),
    FOREIGN KEY (id_proveedor) REFERENCES Proveedor(ID),
	INDEX (matricula)
);


-- Crear una tabla "comanda"
CREATE TABLE IF NOT EXISTS comanda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    num_vehiculo INT NOT NULL,
    estado VARCHAR(50) NOT NULL,
    matricula_v VARCHAR(10),
    id_factura INT,
	FOREIGN KEY (matricula_v) REFERENCES vehiculo(matricula)
);

-- Crear una tabla "factura"
CREATE TABLE IF NOT EXISTS factura(
    id INT AUTO_INCREMENT PRIMARY KEY,
    precio DECIMAL(10, 2) NOT NULL,
    fecha DATE NOT NULL,
    dni_usuario VARCHAR(10) NOT NULL,
    id_comanda INT NOT NULL,
	matricula_vehiculo VARCHAR(10),
	FOREIGN KEY (dni_usuario) REFERENCES usuarios(DNI),
	FOREIGN KEY (id_comanda) REFERENCES comanda(id),
	FOREIGN KEY (matricula_vehiculo) REFERENCES vehiculo (matricula)

);

CREATE TABLE particular (
	id INT AUTO_INCREMENT PRIMARY KEY,
	tipo_usuario VARCHAR(225) NOT NULL,
	nombre VARCHAR(255) NOT NULL,
	apellido VARCHAR(255),
	domicilio VARCHAR(255),
	DNI VARCHAR(20),
	telefono VARCHAR(15),
	razon_social VARCHAR(255),
	correo_electronico VARCHAR(255),
	FOREIGN KEY (id) REFERENCES usuarios(id)
);

CREATE TABLE profesional (
	id INT AUTO_INCREMENT PRIMARY KEY,
	tipo_usuario VARCHAR(225) NOT NULL,
	nombre VARCHAR(255) NOT NULL,
	apellido VARCHAR(255),
	domicilio VARCHAR(255),
	DNI VARCHAR(20),
	CIF VARCHAR(20),
	NIF_gerente VARCHAR(20),
	documento_LOPD VARCHAR(20),
	escritura_constitucion VARCHAR(20),
	telefono VARCHAR(15),
	razon_social VARCHAR(255),
	correo_electronico VARCHAR(255),
	FOREIGN KEY (id) REFERENCES usuarios(id)
);

CREATE TABLE administrador (
	id INT AUTO_INCREMENT PRIMARY KEY,
	tipo_usuario VARCHAR(225) NOT NULL,
	id_empresa VARCHAR(255),
	nombre VARCHAR(255) NOT NULL,
	apellido VARCHAR(255),
	domicilio VARCHAR(255),
	DNI VARCHAR(20),
	telefono VARCHAR(15),
	razon_social VARCHAR(255),
	correo_electronico VARCHAR(255),
	FOREIGN KEY (id) REFERENCES usuarios(id)
);

CREATE TABLE administrativo (
	id INT AUTO_INCREMENT PRIMARY KEY,
	tipo_usuario VARCHAR(225) NOT NULL,
	id_empresa VARCHAR(255),
	nombre VARCHAR(255) NOT NULL,
	apellido VARCHAR(255),
	domicilio VARCHAR(255),
	DNI VARCHAR(20),
	telefono VARCHAR(15),
	razon_social VARCHAR(255),
	correo_electronico VARCHAR(255),
	FOREIGN KEY (id) REFERENCES usuarios(id)
);



CREATE TABLE DocumentoVehiculo (
	ID INT PRIMARY KEY,
	tipo_documento VARCHAR(255),
	ruta_documento VARCHAR(255),
	id_vehiculo int,
	FOREIGN KEY (id_vehiculo) REFERENCES vehiculo(ID)
);

CREATE TABLE Imagen (
	ID INT PRIMARY KEY,
	ruta VARCHAR(255),
	id_vehiculo INT,
	FOREIGN KEY (id_vehiculo) REFERENCES vehiculo(ID)
);
