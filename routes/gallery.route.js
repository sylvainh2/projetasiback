const express = require('express');
const galleryController = require('../controllers/gallery.controller');
const authValidator = require('../utils/auth');
const gallerySchema = require('../models/gallery');
const validator = require('../utils/validator');

const router = express.Router();

router.route('/:name')
    .get(authValidator.isAuth(),async(req,res)=>{
        const galleryFind = await galleryController.getByName(req.params.name);
        console.log("galleryFind1:",galleryFind);
        if(!galleryFind){
            console.log("galleryFind2:",galleryFind);
            res.status(404).json({message:"gallerie non existante"});
        } else {
            res.status(200).json(galleryFind);
        }
    })

    .put(authValidator.isAuth(),validator(gallerySchema),async(req,res)=>{
        console.log(req.params.name,2,req.body.name);
        const galleryPush = await galleryController.add(req.body.name);
        if(!galleryPush){
            res.status(400).json({message:"creation de gallerie impossible"});
        } else {
            res.status(201).json(galleryPush);
        }
    })
;

module.exports = router;