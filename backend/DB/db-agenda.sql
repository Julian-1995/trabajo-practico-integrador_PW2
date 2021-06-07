CREATE DATABASE agenda;
USE agenda;

CREATE TABLE usuario(
usuario_id INT PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
mail VARCHAR (100) NOT NULL,
contrasenia VARCHAR(100) NOT NULL,

CREATE TABLE tareas(
tarea_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
titulo VARCHAR(100) ,
descripcion VARCHAR(200),
estado enum ('pendiente','completada','eliminada'),
fecha_creacion timestamp NOT NULL
fecha_actualizacion timestamp NOT NULL ,
fecha_eliminacion timestamp,
FOREIGN KEY (usuario_id) REFERENCES usuario(usuario_id);
