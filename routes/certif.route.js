const express = require('express');
const authValidator = require('../utils/auth');
const certifController = require('../controllers/certif.controller');
const fs = require('fs');

const router = express.Router();

router.route('/')
.post(authValidator.isAuth(),async(req, res)=>{
    const id = req.auth.id;
    console.log(id)
    console.log('req',req.file.filename);
    const certPic = await certifController.update(id,req.file.filename);
    if (!certPic){
        res.status(400).json({message:"problème à l'enregistrement du certificat"});
    } else {
        res.status(202).json({message:"certificat uploadé"});
    }
})
.delete(authValidator.isAuth(),async(req,res)=>{
    console.log('old',req.body.oldNameC);
    if(req.body.oldNameC){
        fs.unlink('certifs/'+req.body.oldNameC,(err)=>{if (err) throw err});
    }
    res.status(202).json();
})
module.exports = router;