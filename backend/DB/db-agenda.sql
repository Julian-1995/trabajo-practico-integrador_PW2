CREATE DATABASE agenda;
USE agenda;

CREATE TABLE usuario(
usuario_id INT PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
mail VARCHAR (100) NOT NULL,
contrasenia VARCHAR(100) NOT NULL,

CREATE TABLE tareas(
tarea-id INT NOT NULL PRIMARY KEY,
titulo VARCHAR(100) ,
descripcion VARCHAR(200),
estado VARCHAR(20) NOT NULL default "pendiente" ,
fecha-creacion timestamp NOT NULL
fecha-actualizacion timestamp NOT NULL ,
fecha-eliminacion timestamp,
id-usuario int NOT NULL
