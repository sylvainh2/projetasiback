const express = require('express');
const authValidator = require('../utils/auth');
const pictureController = require('../controllers/picture.controller');
const fs = require('fs');

const router = express.Router();

router.route('/')
    .get(authValidator.isAuth(),async(req,res)=>{

        const pictures = await pictureController.getAll();
        console.log('picture',pictures);
        if(!pictures){
            res.status(404).json({message:"Pas de photo stockée"});
        } else {
            res.status(200).json(pictures);
        }
    })

    .put(authValidator.isAuth(),async(req,res)=>{
        console.log(req.body);
        const new_picture = await pictureController.add(req.body);
        if(!new_picture || new_picture.length===0){
            res.status(400).json({message:"problème à la création de la photo"});
        } else {
            res.status(201).json(new_picture);
        }
    })

    ;
 


router.route('/date/:date')
    .get(authValidator.isAuth(),async(req,res)=>{

        const pictures = await pictureController.getByDate(req.params.date);
        if(!pictures){
            res.status(404).json({message:"Pas de photo à cette date"});
        } else {
            res.status(200).json(pictures);
        }
    })
;

router.route('/gallery/:gallery')
    .get(authValidator.isAuth(),async(req,res)=>{

        const pictures = await pictureController.getByGallery(req.params.gallery);
        if(!pictures){
            res.status(404).json({message:"Pas de photo stockée"});
        } else {
            res.status(200).json(pictures);
        }
    })
;

router.route('/gallery&date/:gallery_date')
    .get(authValidator.isAuth(),async(req,res)=>{
        const pictures = await pictureController.getByGalleryDate(req.params.gallery_date);
        if(!pictures){
            res.status(404).json({message:"Pas de photo à cette date ou gallerie"});
        } else {
            res.status(200).json(pictures);
        }
    })
;

router.route('/:id')
    .delete(authValidator.isAuth(),async(req,res)=>{

        const picture = await pictureController.getById(req.params.id);
        if (req.auth.roles != "admin" && (picture[0].user_id != req.auth.id)) {
            res.status(403).json({message: "Désolé mais ce n'est pas votre image!"});
        } else if (!picture) {
            res.status(404).json();
        } else {
            console.log('uploads/'+picture[0].picture);
            fs.unlink('uploads/'+picture[0].picture,(err)=>{if (err) throw err});
            const pictures = await pictureController.remove(req.params.id);
            if(!pictures){
                res.status(404).json();
            } else{
                res.status(202).json(pictures);
            }
        }
    })
;
module.exports = router;

