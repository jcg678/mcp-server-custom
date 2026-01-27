const project = require("../models/project");
const Project = require("../models/project");

const save = (req,res)=>{

    let body = req.body;
        console.log(body);
    if(!body.name || !body.description || !body.state){
        return res.status(404).send({
            status: "error",
            message: "Faltan datos por enviar"
        })
    }

    let projectoToSave = new Project(body);

    projectoToSave.save().then(project=>{

        if(!project){
                    return res.status(500).send({
            status: "El proyecto no se ha guardado",

        })
        }

        return res.status(200).send({
            status: "save succeful",
            project
        })

    }).catch(error=>{
          return res.status(500).send({
            status: "error",
            message: "Error al guardar",
            error:error
        });
})


}

const list = (req, res)=>{
    Project.find().then(projects=>{
        if(!projects){
                return res.status(404).send({
            status: "Sin proyectos",

                 })
        }

        return res.status(200).send({
            status: "success",
            projects
        })

    }).catch(error=>{
        return res.status(500).send({
            status: "error",
            message: "Error al mostrar listado",
            error
        })
    })
}

const item = (req, res)=>{
    let id = req.params.id;

    Project.findById(id).then(project=>{

        if(!project){
                return res.status(404).send({
            status: "Sin detalle",

                 })
        }

        return res.status(200).send({
            status: "success",
            project
        })

    }).catch(error=>{
        return res.status(500).send({
            status: "error",
            message: "Error al mostrar el detalle",
            error
        })
    })
}




module.exports = {
    save,
    list,
    item
}