USE agenda;
select * from usuario;
select * from tareas;

SELECT usuario.usuario_id,usuario.nombre,
tareas.titulo, tareas.descripcion, tareas.estado,
tareas.fecha_creacion,tareas.fecha_actualizacion,tareas.fecha_eliminacion

FROM tareas
INNER JOIN usuario
ON usuario.usuario_id=tareas.id_usuario
WHERE tareas.fecha_creacion  between "20210101" and "20230414" 
AND (tareas.estado like "pendiente");