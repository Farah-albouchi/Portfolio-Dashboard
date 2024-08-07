const mongoose = require('mongoose');

const ServicesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Service = mongoose.model('Service', ServicesSchema); // Ensure the model name is 'Service'

module.exports = {
    Service
};
