const express = require('express');
const codeController = require('../controllers/code.controller');

const router = express.Router();

router.route("/")
    .patch(async(req,res)=>{
        const user = codeController.update(req.body.id,req.body);
        if(!user || user.length===0){
            res.status(404).json();
        } else {
            res.status(201).json(user);
        }
    })

module.exports = router;