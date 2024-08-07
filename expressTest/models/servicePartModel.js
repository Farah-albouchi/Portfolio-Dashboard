const mongoose = require('mongoose');
const { Service } = require('./servicesModel'); // Correctly import the Service model

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
    title2: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
    },
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service' // Ensure this matches the model name
    }]
}, { timestamps: true });

const ServicePart = mongoose.model('ServicePart', NewSchema);

module.exports = {
    ServicePart
};
