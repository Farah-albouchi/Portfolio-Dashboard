const mongoose = require('mongoose');

const AchievementsSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Achievement = mongoose.model('Achievement', AchievementsSchema); // Ensure the model name is 'Achievement'

module.exports = {
    Achievement
};
