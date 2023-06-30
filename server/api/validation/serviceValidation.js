const Joi = require('joi');

const validateServiceInput = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(30).required(),
        description: Joi.string().min(5).max(300).required(),
        price: Joi.number().min(1).required(),
        imageUrl: Joi.string().required(),
        duration: Joi.number().min(1).required(),
    });

    return schema.validate(data);
};

module.exports = { validateServiceInput };
