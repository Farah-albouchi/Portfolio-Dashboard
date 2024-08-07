const mongoose = require('mongoose');

const PartnersSchema = new mongoose.Schema({
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    
      },
    PartnerName: {
        type: String,
        required: true,
        trim: true,
        unique:true ,
    },
    image: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Partner = mongoose.model('Partner', PartnersSchema);

module.exports = {
  Partner
};
