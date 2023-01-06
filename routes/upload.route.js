const express = require('express');
const multer  = require('multer');
const fs = require('fs').promises;
const port = 8080;

const router = express.Router();

router.route('/')
.post(async(req, res)=>{
    
    console.log(req);
    console.log(req.body);
});

module.exports = router;
 
