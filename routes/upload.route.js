const express = require('express');

const router = express.Router();

router.route('/')
.post(async(req, res)=>{
    res.status(202).json({message:"image uploadée"});
});

module.exports = router;
 
