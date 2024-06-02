const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    last_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    avatar: {
        type: String,
        required: true,
    },
});


function validateUser(user) {
    const schema = {
        first_name: Joi.string()
            .min(2)
            .max(50)
            .required(),
        last_name: Joi.string()
            .min(2)
            .max(50)
            .required(),
        email: Joi.string()
            .min(5)
            .max(255)
            .required()
            .email(),
        avatar: Joi.string()
            .uri()
            .required()
    };

    return Joi.validate(user, schema);
}

exports.validate = validateUser;