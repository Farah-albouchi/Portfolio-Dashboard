const Joi = require('joi');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Firstname: {
        type: String,
        required: true,
        trim: true,
    },
    Lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    address: {
        type: String,
       required : false ,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    FBlink: {
        type: String,
        required: false,
        required : false ,
    },
    INSTAlink: {
        type: String,
        required: false,
        required : false ,
    },
    LinkedIN: {
        type: String,
        required: false,
        required : false ,
    },
    phone: {
        type: String,
        trim: true,
        required : false ,
    },
    OTPcode : {
        type : String ,
    },
    prevPassword : {
        type : String ,
        minlength: 8,
    },
    changedAt : {
        type : Date ,
    },
    resetPasswordExpires : {
        type : Date ,
    },
    workingHoures : {
        type : String , 

    }

}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

function validateRegisterUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().required().email(),
        password: Joi.string().trim().required(),
        Firstname: Joi.string().trim().required(),
        Lastname: Joi.string().trim().required(),
        address: Joi.string(),
        phone: Joi.string(),
        FBlink: Joi.string(),
        INSTAlink: Joi.string(),
        LinkedIN: Joi.string(),
        
    });
    return schema.validate(obj);
}

function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().required().email(),
        password: Joi.string().trim().required(),
    });
    return schema.validate(obj);
}
function validateUpdateUser(obj ) {
    const schema = Joi.object({
        email: Joi.string().trim().email(),
        password: Joi.string().trim(),
        Firstname: Joi.string().trim(),
        Lastname: Joi.string().trim(),
        address: Joi.string().trim(),
        phone: Joi.string().trim(),
        FBlink: Joi.string().trim(),
        INSTAlink: Joi.string().trim(),
        LinkedIN: Joi.string().trim(),
    });
    return schema.validate(obj);
}

module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser
}
