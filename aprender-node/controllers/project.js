const fs = require("fs");
const path = require("path");


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


const deleteProject = (req, res)=>{
    let id = req.params.id;

    Project.findById(id).deleteOne().then(project=>{

        if(!project){
                return res.status(404).send({
            status: "No se ha borrado",

                 })
        }

        return res.status(200).send({
            status: "success",
            project
        })

    }).catch(error=>{
        return res.status(500).send({
            status: "error",
            message: "Error al borrar el detalle",
            error
        })
    })
}


const update = (req,res)=>{
    let body = req.body;

        console.log(body);
        if(!body || !body.id){
            return res.status(404).send({
                    status: "error",
                    message: "no se ha el body"

                })
        }

        Project.findByIdAndUpdate(body.id, body,{new:true})
        .then(projectUpdate=>{


                    if(!projectUpdate){
                        return res.status(404).send({
                        status: "No se ha actualizado",

                    })
                    }

        return res.status(200).send({
            status: "success",
            project: projectUpdate
        })
        }).catch(error=>{
             return res.status(500).send({
            status: "error",
            message: "No se puede actulizar",
            error
        })
        })
}

const upload = (req,res) =>{

    let id = req.params.id;

    
    if(!req.file){
        return res.status(404).send({message: "No enviado archivo"});
    }


    const filePath = req.file.path;
    const extension = path.extname(req.file.originalname).toLocaleLowerCase().replace(".","");

    const validExtensions = ["png", "jpg", "jpeg", "gif"];

    if(!validExtensions.includes(extension)){
        fs.unlinkSync(filePath)
         return res.status(200).send({message: "Extension no valida"});
    }

            Project.findByIdAndUpdate({_id:id}, {image: req.file.filename},{new:true})
        .then(projectUpdate=>{


                    if(!projectUpdate){
                        return res.status(404).send({
                        status: "No se ha actualizado",

                    })
                    }

        return res.status(200).send({
            status: "success",
            project: projectUpdate
        })
        }).catch(error=>{
             return res.status(500).send({
            status: "error",
            message: "No se puede actulizar",
            error
        })
        })



}

const getImage = (req,res) =>{ 

    let file = req.params.file;

    let filePath = "./uploads/images/"+file;

    fs.stat(filePath,(error, exist)=>{
        if(!error && exist){

            return res.sendfile(path.resolve(filePath));
        }else{
            return res.status(500).send({message: "Error"});
        }

    })

         
}



module.exports = {
    save,
    list,
    item,
    deleteProject,
    update,
    upload,
    getImage
}