const express = require('express');

const router = express.Router();

router.route('/')
.post(async(req, res)=>{
    
    console.log(req);
    console.log(req.body);
});

module.exports = router;
 
