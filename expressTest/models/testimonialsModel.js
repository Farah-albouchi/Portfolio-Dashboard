
const mongoose = require('mongoose'); 

const TestimonialsSchema = new mongoose.Schema ({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required:true , 
        trim:true ,
    } , 
    image: {
        type: String,
        required: false,
      } ,
    description : {
        type: String,
        required: true,
        trim:true,
    },
    review: {
        type: Number ,
        required: true,
    },
    job: {
        type: String,
        required: true,
    }
}, { timestamps: true }); 
 

const Testimonials = mongoose.model('Testimonials',TestimonialsSchema);

module.exports = {Testimonials};