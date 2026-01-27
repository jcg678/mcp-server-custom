const connection = require("./database/connection");
const express = require("express");
const cors = require("cors");

connection();

const app = express();
const port = 3977;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const projectRoutes = require("./routes/project");

app.use("/api/project", projectRoutes)

app.get("/", (req, res)=>{
    console.log("ruta pruebas");

    return res.status(200).send({
        curso: "css",
        profesor: "lopaco"
    })
})

app.get("/prueba", (req, res)=>{
    console.log("ruta pruebas");

    return res.status(200).send(`<h1>Prueba</h1>`)
})

app.listen(port, ()=>{
    console.log("Servidor corriendo en el puerto"+port);
})