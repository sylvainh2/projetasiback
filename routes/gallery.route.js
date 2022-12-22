const express = require('express');
const galleryController = require('../controllers/gallery.controller');
const authValidator = require('../utils/auth');
const gallerySchema = require('../models/gallery');
const validator = require('../utils/validator');

const router = express.Router();

router.route('/:gallery')
    .get(authValidator.isAuth(),async(req,res)=>{
        const galleryFind = await galleryController.getByName(req.params.gallery);
        // console.log(2,galleryFind);
        if(!galleryFind){
            res.status(404).json({message:"gallerie non existante"});
        }
        // console.log(3,galleryFind);
        res.status(200).json(galleryFind);
    })

    .put(authValidator.isAuth(),validator(gallerySchema),async(req,res)=>{
        const galleryPush = await galleryController.add(req.params.gallery);
        if(!galleryPush){
            res.status(400).json({message:"creation de gallerie impossible"});
        }
        res.status(201).json(galleryPush);
    })
;

module.exports = router;