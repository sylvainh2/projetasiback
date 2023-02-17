const express = require('express');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/user.controller');
const signSchema = require('../models/sign');
const validator = require('../utils/validator');
const config = require('../config');

const router = express.Router();

router.route('/')
    .post(validator(signSchema),async(req,res)=>{

        let user = await userController.getByEmail(req.body);

        if(user){
            res.status(400).json({message:"un compte avec cet email existe déjà"});
        } else {
            const new_user = await userController.add(req.body);
            const token = jwt.sign({
                id:new_user.id,
                email:new_user.email,
                roles:new_user.roles,
                validity:new_user.validity
            },config.jwtPass,{expiresIn:config.jwtExpireLength});

            // on renvoie le token
            res.json({
                access_token:token
            });
        }
    });

module.exports = router;    