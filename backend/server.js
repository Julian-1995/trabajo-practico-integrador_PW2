const express = require("express");
const { PORT } = require("./src/config");
const { initConnection } = require("./src/database");

const app = express();
app.use(express.json());
app.use(express.static("./frontend"));

const tareasAPI = require("./src/handlers");
app.use("/", tareasAPI);

initConnection().then(() => {
  app.listen(PORT, () => {
    console.info(`el servidor esta escuchando en el puerto: ${PORT}`);
  });
});

/*
connection.connect((error) => {
    if (error) throw error;
    console.info("la base de datos esta funcionando");
 }); 
 
    app.listen(PORT, () => {
    console.info(`el servidor esta escuchando en el puerto: ${PORT}`);
 }); 
 
 */