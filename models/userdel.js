const Joi = require('joi');

const schema = Joi.object().keys({
    id: Joi.number(),
    first_name: Joi.string().required(),
    name: Joi.string().required(),
    validity: Joi.string().min(0).max(1),
    roles: Joi.string().min(0).max(5)
});

module.exports = schema;