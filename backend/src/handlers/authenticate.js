const express = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const database = require("../database");
const requestHandler = require("../middlewares/requestHandler");

const autenticarRouting = express.Router();

autenticarRouting.post(
    "/login",
    requestHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await database.busquedaUsuario(username, password);

    if (user) {
        const accessToken = jwt.sign(
            {
            username,
            usuario_id: user.usuario_id,
            },
            JWT_SECRET,
            {
            expiresIn: "30m",
            }
        );
        res.json({
        accessToken,
        status: "Logged in",
        usuario_id: user.usuario_id,
        });
    }else{
        res.status(401).json({
        error: "Usuario o contraseña incorrecto",
        status: "error",
        });
    }
  })
);

module.exports = autenticarRouting;