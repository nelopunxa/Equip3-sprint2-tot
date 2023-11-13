-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql-server
-- Temps de generació: 30-10-2023 a les 10:29:42
-- Versió del servidor: 10.11.5-MariaDB-1:10.11.5+maria~ubu2204
-- Versió de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de dades: `db_equip3`
--

-- --------------------------------------------------------

--
-- Estructura de la taula `comanda`
--

CREATE TABLE `comanda` (
  `id` int(11) NOT NULL,
  `num_vehiculo` int(11) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `matricula_v` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Bolcament de dades per a la taula `comanda`
--

INSERT INTO `comanda` (`id`, `num_vehiculo`, `estado`, `matricula_v`) VALUES
(1, 2, 'Pendiente', 'ABC123'),
(2, 1, 'En proceso', 'XYZ789');

-- --------------------------------------------------------

--
-- Estructura de la taula `factura`
--

CREATE TABLE `factura` (
  `id` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `fecha` date NOT NULL,
  `dni_usuario` varchar(10) NOT NULL,
  `id_comanda` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Bolcament de dades per a la taula `factura`
--

INSERT INTO `factura` (`id`, `precio`, `fecha`, `dni_usuario`, `id_comanda`) VALUES
(1, 15000.00, '2023-01-20', '12345678A', 1),
(2, 18000.00, '2023-02-10', '98765432B', 2);

-- --------------------------------------------------------

--
-- Estructura de la taula `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `tipo_usuario` varchar(225) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `domicilio` varchar(255) NOT NULL,
  `DNI` varchar(10) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `razon_social` varchar(255) NOT NULL,
  `correo_electronico` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Bolcament de dades per a la taula `usuario`
--

INSERT INTO `usuario` (`id`, `tipo_usuario`, `nombre`, `apellido`, `domicilio`, `DNI`, `telefono`, `razon_social`, `correo_electronico`) VALUES
(1, 'profesional', 'Juan', 'Gómez Pérez', 'Calle Principal 123', '12345678A', '123456789', 'trabajador de taller', 'juan@gmail.com'),
(2, 'particular', 'María', 'López Martínez', 'Avenida Secundaria 456', '98765432B', '987654321', 'inversora en bolsa', 'maria@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de la taula `vehiculo`
--

CREATE TABLE `vehiculo` (
  `ID` int(11) NOT NULL,
  `matricula` varchar(10) DEFAULT NULL,
  `color` varchar(50) NOT NULL,
  `danys` varchar(255) NOT NULL,
  `modelo` varchar(255) NOT NULL,
  `tipo_carburante` varchar(50) NOT NULL,
  `fecha_matriculacion` date NOT NULL,
  `km` int(11) NOT NULL,
  `marca` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `iva` decimal(5,2) NOT NULL,
  `num_bastidor` varchar(50) NOT NULL,
  `tipo_cambio` varchar(20) NOT NULL,
  `precio_venta` decimal(10,2) NOT NULL,
  `precio_compra` decimal(10,2) NOT NULL,
  `id_proveedor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Bolcament de dades per a la taula `vehiculo`
--

INSERT INTO `vehiculo` (`ID`, `matricula`, `color`, `danys`, `modelo`, `tipo_carburante`, `fecha_matriculacion`, `km`, `marca`, `descripcion`, `iva`, `num_bastidor`, `tipo_cambio`, `precio_venta`, `precio_compra`, `id_proveedor`) VALUES
(1, 'ABC123', 'Rojo', 'Ninguno', 'Sedán', 'Gasolina', '2023-01-15', 50000, 'Toyota', 'Descripción del vehículo 1', 21.00, '12345', 'Manual', 15000.00, 12000.00, NULL),
(2, 'XYZ789', 'Azul', 'Arañazos en la puerta trasera', 'SUV', 'Diésel', '2022-11-20', 60000, 'Ford', 'Descripción del vehículo 2', 21.00, '54321', 'Automático', 18000.00, 14000.00, NULL);

--
-- Índexs per a les taules bolcades
--

--
-- Índexs per a la taula `comanda`
--
ALTER TABLE `comanda`
  ADD PRIMARY KEY (`id`),
  ADD KEY `matricula_v` (`matricula_v`);

--
-- Índexs per a la taula `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dni_usuario` (`dni_usuario`),
  ADD KEY `id_comanda` (`id_comanda`);

--
-- Índexs per a la taula `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `DNI` (`DNI`);

--
-- Índexs per a la taula `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `matricula` (`matricula`);

--
-- AUTO_INCREMENT per les taules bolcades
--

--
-- AUTO_INCREMENT per la taula `comanda`
--
ALTER TABLE `comanda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la taula `factura`
--
ALTER TABLE `factura`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la taula `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la taula `vehiculo`
--
ALTER TABLE `vehiculo`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restriccions per a les taules bolcades
--

--
-- Restriccions per a la taula `comanda`
--
ALTER TABLE `comanda`
  ADD CONSTRAINT `comanda_ibfk_1` FOREIGN KEY (`matricula_v`) REFERENCES `vehiculo` (`matricula`);

--
-- Restriccions per a la taula `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`dni_usuario`) REFERENCES `usuario` (`DNI`),
  ADD CONSTRAINT `factura_ibfk_2` FOREIGN KEY (`id_comanda`) REFERENCES `comanda` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
