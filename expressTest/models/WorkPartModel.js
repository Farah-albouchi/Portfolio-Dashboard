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
    
    Achievements: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Achievement' 
    }]
}, { timestamps: true });

const WorkPart = mongoose.model('WorkPart', NewSchema);

module.exports = {
    WorkPart
};
