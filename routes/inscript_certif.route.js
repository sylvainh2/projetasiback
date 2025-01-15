const express = require('express');
const authValidator = require('../utils/auth');
const inscriptController = require('../controllers/inscript.controller');
const fs = require('fs');

const router = express.Router();

router.route('/')
.post(authValidator.isAuth(),async(req, res)=>{
    const id = req.auth.id;
    console.log(id)
    console.log('req',req.file.filename);
    const certPic = await inscriptController.update(id,req.file.filename);
    if (!certPic){
        res.status(400).json({message:"problème à l'enregistrement du dossier d'inscription"});
    } else {
        res.status(202).json({message:"inscription uploadée"});
    }
})
.delete(authValidator.isAuth(),async(req,res)=>{
    console.log('old',req.body.oldNameC);
    if(req.body.oldNameC){
        fs.unlink('inscriptions/'+req.body.oldNameC,(err)=>{if (err) throw err});
    }
    res.status(202).json();
})
module.exports = router;