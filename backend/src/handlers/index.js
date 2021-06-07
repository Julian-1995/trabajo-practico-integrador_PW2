const express = require("express");
const database = require("../database");
const autenticarJWT = require("../middlewares/authenticateJWT");
const { ValidationError } = require(".."); //crear validations

const autenticarRouting = require("./");

const tareasRouting = require("./tareas");
const usuariosRouting = require("./usuario");
const apiRouting = express.Router();

apiRouting.use(
  "/api",
  autenticarRouting,
  autenticarJWT,
  tareasRouting,
  usuariosRouting
);

apiRouting.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(400).json({
      status: "error",
      error: err.formatErrors(),
    });
  }
});

module.exports = apiRouting;