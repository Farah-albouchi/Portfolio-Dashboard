const { date, required } = require('joi');
const mongoose = require('mongoose');


const NewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    Name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    object: {
        type: String,
        required: false,
    },
    Text: {
        type: String,
        required: true,
    },
    date : {
        type: Date ,
        required:true 
    }
   
}, { timestamps: true });

const Message = mongoose.model('Message', NewSchema);

module.exports = {
    Message
};
