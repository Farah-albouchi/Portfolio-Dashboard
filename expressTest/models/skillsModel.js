
const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  }, { timestamps: true });

const Skill = mongoose.model('Skill',SkillSchema);

module.exports={
    Skill
}