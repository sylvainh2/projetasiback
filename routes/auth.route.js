const express = require('express');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/user.controller');
const userSchema = require('../models/user');
const signSchema = require('../models/sign');
const validator = require('../utils/validator');
const config = require('../config');
const loginValidator = require('../utils/auth');

const router = express.Router();

router.route('/')
    .post(validator(userSchema),async(req,res)=>{

        let user = await userController.getByEmailAndPassword(req.body);

        if(!user){
            res.status(401).json({message: "combinaison Email/Password incorrecte"});
        } else {
            const token = jwt.sign({
                id:user.id,
                email:user.email,
                roles:user.roles
            },config.jwtPass,{expiresIn:config.jwtExpireLength});
            // on stocke le token dans le local storage et on le renvoie
            
            
            res.json({
                access_token:token
            });
        }
    })
;
router.route('/signup')
    .post(validator(signSchema),async(req,res)=>{

        let user = await userController.getByEmail(req.body);

        if(user){
            res.status(400).json({message: "un compte avec cet Email existe déjà"});
        } else {
            const new_user = await userController.add(req.body);
            const token = jwt.sign({
                id:new_user.id,
                email:new_user.email,
                roles:new_user.roles
            },config.jwtPass,{expiresIn:config.jwtExpireLength});
            res.json({
                access_token:token
            });
        }
    });

module.exports = router;    