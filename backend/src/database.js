const mysql = require("mysql2/promise");
const { DB_CONFIG } = require("./config");

let connection;

function obtenerFecha() {
    const fecha_actual = new Date();

    const dia = fecha_actual.getDate();
    const mes = fecha_actual.getMonth();
    const anio = fecha_actual.getFullYear();
    const fecha_completa = anio + "-" + mes + "-" + dia;

    return fecha_completa;
}

module.exports = {

    async initConnection() {
        connection = await mysql.createConnection(DB_CONFIG);
  },
  
    async obtenerTarea(usuario_id) {
        let tareas = [];
        [tareas] = await connection.execute(
        "SELECT * FROM tareas WHERE usuario_id = ? AND estado <> 'eliminada'",
        [usuario_id]
    );

    return tareas;
  },

    async obtenerTareaId(id) {
        let tarea = [];
        [tarea] = await connection.execute("SELECT * FROM tareas WHERE tarea_id = ?", [tarea_id,]);

        if (tarea.length) {
            return tarea[0];
        } else {
            return undefined;
        }
  },

    async insertarTarea(tarea) {
        fecha = obtenerFecha();

        const result = await connection.execute(
        "INSERT INTO tareas (usuario_id, titulo, descripcion, estado, fecha_creacion, fecha_actualizacion, fecha_eliminado) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
            tarea.usuario_id,
            tarea.titulo,
            tarea.descripcion,
            "pendiente",
            fecha,
            fecha,
            null,
            ]
        );
        return await this.obtenerTareaId(result[0].insertId);
    },


  async busquedaUsuario(username, password){
        const [usuario] = await connection.execute(
        "SELECT * FROM usuario WHERE nombre = ? AND contrasenia = ?",
        [username, password]
        );

        if (usuario.length) {
            return usuario[0];
        }else{
            return undefined;
        }
    },
  
  async obtenerUsuario(usuario_id){
        const [usuario] = await connection.execute(
        "SELECT * FROM usuario WHERE usuario_id = ?",
        [usuario_id]
    );
        if (usuario.length){
            return usuario[0];
        }else{
            return undefined;
        }
    },
 
    async remove(id) {
        const tarea = await this.obtenerTarea(id);

        if (!tarea) {   
         throw new Error(`No existe la tarea: "${id}`);
         }

        const fecha = obtenerFecha();
        await connection.execute(
        "UPDATE tareas SET eliminated = ?, estado = 'eliminada' WHERE tarea_id = ?",
        [fecha, id]
        );
    },
 
    async complete(id) {
        const tarea = await this.obtenerTarea(id);

        if (!tarea) {
        throw new Error(`No existe la tarea: "${id}`);
        }

        await connection.execute(
            "UPDATE tareas SET estado = 'completada' WHERE tarea_id = ?",
            [id]
        );
  },
};