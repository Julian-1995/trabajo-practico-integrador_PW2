USE agenda;
select * from usuario;
select * from tareas;

SELECT usuario.usuario_id,usuario.nombre,
tareas.titulo, tareas.descripcion, tareas.estado,
tareas.fecha-creacion,tareas.fecha-actualizacion,tareas.fecha-eliminacion

FROM tareas
INNER JOIN usuario
ON usuario.usuario_id=tareas.id-usuario
WHERE tareas.fecha-creacion  between "20210101" and "20230414" 
AND (tareas.estado like "pendiente");