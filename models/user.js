// on importe Joi pour mettre à un format precis les données saisies et on crée les conditions de format 
const Joi = require('joi');

const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

module.exports = schema;