const Joi = require("joi");

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