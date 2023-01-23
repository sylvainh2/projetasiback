const Joi = require('joi');

const schema = Joi.object().keys({
    title: Joi.string(),
    picture: Joi.string().required,
    gallery_id: Joi.number().required,
    user_id: Joi.number().required
})

module.exports = schema;