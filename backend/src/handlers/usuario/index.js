const express = require("express");

const database = require("../../database");
const requestHandler = require("../../middlewares/requestHandler");

const usuariosRouting = express.Router();

usuariosRouting.get(
  "/usuario/:usuario_id",
  requestHandler(async (req, res) => {
    const { usuario_id } = req.params;
    const usuario = await database.obtenerUsuario(usuario_id);

    res.json(usuario);
  })
);

module.exports = usuariosRouting;