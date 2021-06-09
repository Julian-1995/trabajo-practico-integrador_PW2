const validarTitulo = require("../../"); //agregar validations
const validateErrors = require("../../");//agregar validations

const express = require("express");

const database = require("../../database");
const requestHandler = require("../../middlewares/requestHandler");

const tareasRouting = express.Router();


tareasRouting.get(
    "/tareas/:usuario_id",
    requestHandler(async (req, res) => {
        const { usuario_id } = req.params;
        const tareas = await database.obtenerTareaI(usuario_id);

        res.json(tareas);
    })
);


tareasRouting.post(
    "/tareas/add/:usuario_id",
    validarTitulo,
    validateErrors,
    requestHandler(async (req, res) => {
        const usuario_id = req.params.usuario_id;
        const tarea = {
        usuario_id,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
    };

    const resul = await database.insertarTarea(tarea);

    res.json(resul);
  })
);

tareasRouting.delete(
    "/tareas/:tarea_id",
    requestHandler(async (req, res) => {
        const tarea_id = parseInt(req.params.tarea_id);

        await database.remove(tarea_id);

    res.json({
        message: "Tarea eliminada",
        });
    })
);

tareasRouting.put(
    "/tareas/done/:tarea_id",
    requestHandler(async (req, res) => {
        const tarea_id = parseInt(req.params.tarea_id);

        await database.complete(tarea_id);

    res.json({
      message: "Tarea completada",
    });
  })
);

module.exports = tareasRouting;