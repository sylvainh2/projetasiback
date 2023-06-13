const express = require('express');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/user.controller');
const userSchema = require('../models/user');
const validator = require('../utils/validator');
const config = require('../config');

const router = express.Router();

router.route('/')
    .post(validator(userSchema),async(req,res)=>{
        let user = await userController.getByEmailAndPassword(req.body);
        if(!user){
            res.status(401).json({message: "combinaison Email/Password incorrecte"});
        // } else if(user.validity !=1){
        //     res.status(401).json({message:"Désolé, votre compte n'a pas été validé"});
        } else {
            const token = jwt.sign({
                id:user.id,
                email:user.email,
                roles:user.roles,
                validity:user.validity
            },config.jwtPass,{expiresIn:config.jwtExpireLength});
            
            // on renvoie le token            
            res.json({
                access_token:token
            });
        }
    })
;

module.exports = router;    