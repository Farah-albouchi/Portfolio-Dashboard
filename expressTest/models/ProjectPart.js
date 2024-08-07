const mongoose = require('mongoose');


const NewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    types : [
        {
           type:String , 
        }
    ],
    
    Projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project' 
    }]
}, { timestamps: true });

const ProjectPart = mongoose.model('ProjectPart', NewSchema);

module.exports = {
    ProjectPart
};
