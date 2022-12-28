const Joi = require('joi');

const schema = Joi.object().keys({
    title: Joi.string(),
    picture: Joi.string().required
})

module.exports = schema;