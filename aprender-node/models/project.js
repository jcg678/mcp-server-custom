const {Schema, model} = require("mongoose");

const ProjectSchema =new Schema({
    name : {
        type: String,
        require: true,
        trim: true
    },
    description:  {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    image:  {
        type: String,
        default: "default.png"
    },
    created_at:  {
        type: Date,
        default: Date.now
        
    }
});

module.exports = model("Project", ProjectSchema, "projects" );