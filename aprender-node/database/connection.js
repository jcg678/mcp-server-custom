const moongose = require("mongoose");

const  connection = async() => {
    try{
        await moongose.connect("mongodb://127.0.0.1:27017/bd-portafolio");
        console.log("Conectado a la bd");

    }catch(error){
        console.log(error);
        throw new Error("No se ha podido acceder a la base de datos")
    }
}

module.exports = connection;