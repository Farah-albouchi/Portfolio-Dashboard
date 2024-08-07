const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
  userId :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  CV : {
    type: String,
    required: false,
  },
  job : {
    type: String,
    required: true,
  }
}, { timestamps: true });  

const Home = mongoose.model('Home', HomeSchema);

module.exports = {
  Home
};
