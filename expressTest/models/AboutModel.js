const { object } = require('joi');
const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  userId :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',

  },
  title: {
    type: String,
    trim: true,
  },
  title2: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    
  },
  image: {
    type: String,
    required: false,
  },
  skills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
    }
  ],
  awards : {
    type : Array , 
    of : String , 
  },
  education : {
    type : Array ,
    of : String ,  
  }
}, { timestamps: true });  

const About = mongoose.model('About', AboutSchema);

module.exports = {
  About
};
