// on importe Joi pour mettre à un format precis les données saisies et on crée les conditions de format 
const Joi = require('joi');

const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    repassword: Joi.string().required().valid(Joi.ref('password')),
    first_name: Joi.string().required(),
    name: Joi.string().required(),
    birthdate: Joi.date().min('1930-01-01').required(),
    address: Joi.string().required(),
    postcode: Joi.string().min(5).max(6).required(),
    city: Joi.string().required(),
    tel: Joi.string().min(10).max(12).required(),
    share_infos: Joi.number()
});

module.exports = schema;