const express = require('express');

const router = express.Router();

router.route('/')
.post(async(req, res)=>{
    
    console.log(req);
});

module.exports = router;
 
