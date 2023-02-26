const express = require('express');
const authValidator = require('../utils/auth');
const profileController = require('../controllers/profile.controller');
const fs = require('fs');

const router = express.Router();

router.route('/')
.post(authValidator.isAuth(),async(req, res)=>{
    const id = req.auth.id;
    console.log(id)
    console.log('req',req.file.filename);
    const proPic = await profileController.update(id,req.file.filename);
    if (!proPic){
        res.status(400).json({message:"problème à l'enregistrement de la photo"});
    } else {
        res.status(202).json({message:"image uploadée"});
    }
})
.delete(authValidator.isAuth(),async(req,res)=>{
    console.log('old',req.body.oldName);
    fs.unlink('profiles/'+req.body.oldName,(err)=>{if (err) throw err});
    res.status(202).json();
})
;

module.exports = router;
 