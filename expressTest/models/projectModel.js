
const mongoose = require('mongoose'); 

const ProjectSchema = new mongoose.Schema ({
    name: {
        type: String,
        required:true , 
        trim:true ,
    } , 
    image: {
        type: String,
        required: false,
      } ,
    type : {
        type: String,
        required: true,
        trim:true,
    }
}, { timestamps: true }); 
 

const Project = mongoose.model('Project',ProjectSchema);

module.exports = {Project};