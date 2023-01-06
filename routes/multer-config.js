const multer = require('multer');
// const express = require('express');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination:(req,file, callback)=>{
        callback(null,'uploads')
    },
    filename:(req, file, callback)=>{
        const name = file.originalname.split(' ').join('_');
        console.log(name);
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + '.' + extension)
    }
});
console.log(storage);

module.exports = multer({storage: storage}).single("file");

