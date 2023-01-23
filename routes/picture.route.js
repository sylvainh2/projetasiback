const express = require('express');
const authValidator = require('../utils/auth');
const pictureController = require('../controllers/picture.controller');
const validator = require('../utils/validator');
const pictureSchema = require('../models/picture');
const multer = require("./multer-config");

const router = express.Router();

router.route('/')
    .get(authValidator.isAuth(),async(req,res)=>{
        const pictures = await pictureController.getAll();
        if(!pictures){
            res.status(404).json();
        } else {
            res.status(200).json(pictures);
        }
    })

    .put(authValidator.isAuth(),async(req,res)=>{
        console.log(req.body);
        const new_picture = await pictureController.add(req.body);
        if(!new_picture || new_picture.length===0){
            res.status(400).json();
        } else {
            res.status(201).json(new_picture);
        }
    })

;

router.route('/date/:date')
    .get(authValidator.isAuth(),async(req,res)=>{
        const pictures = await pictureController.getByDate(req.params.date);
        if(!pictures){
            res.status(404).json();
        } else {
            res.status(200).json(pictures);
        }
    })
;

router.route('/gallery/:gallery')
    .get(authValidator.isAuth(),async(req,res)=>{
        const pictures = await pictureController.getByGallery(req.params.gallery);
        if(!pictures){
            res.status(404).json();
        } else {
            res.status(200).json(pictures);
        }
    })
;

router.route('/gallery&date/:gallery_date')
    .get(authValidator.isAuth(),async(req,res)=>{
        const pictures = await pictureController.getByGalleryDate(req.params.gallery_date);
        if(!pictures){
            res.status(404).json();
        } else {
            res.status(200).json(pictures);
        }
    })
;

router.route('/:id')
    .delete(authValidator.isAuth(),async(req,res)=>{

        const picture = await pictureController.getById(req.params.id);

        if (req.auth.roles != "admin" && (picture.user_id != req.auth.id)) {
            res.status(403).json();
        } else if (!picture) {
            res.status(404).json();
        } else {

        const pictures = await pictureController.remove(req.params.id);
        if(!pictures){
            res.status(404).json();
        } else{
            res.status(202).json();
        }
    }})
;
module.exports = router;

