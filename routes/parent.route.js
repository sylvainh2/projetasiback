const express = require('express');
const authValidator = require('../utils/auth');
const comController = require('../controllers/com.controller.js');

const router = express.Router();

router.route("/")
    .get(async(req,res)=>{
        console.log("req",req.query.picture,req.query.parent);
        if(req.query.parent==null){
            const coms = await comController.getAll(req.query.picture);
            if(!coms){
                res.status(400).json({message:"Pas de commentaire"})
            } else {
                res.status(200).json(coms)
            }
        } else {
            const coms = await comController.getChild(req.query.picture, req.query.parent);
            if(!coms){
                res.status(400).json({message:"Pas de commentaire"})
            } else {
                res.status(200).json(coms)
            }
        }
    })
    .put(async(req,res)=>{
        const coms = await comController.add(req.body);
        if(!coms){
            res.status(400).json({message:"Problème à l'enregistrement"})
        } else {
            res.status(200).json(coms)
        }
    })

module.exports = router;