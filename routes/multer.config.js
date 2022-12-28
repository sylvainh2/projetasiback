const multer = require('multer');
const express = require('express');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'application/pdf': 'pdf'
}
const storage = multer.diskStorage({
    destination:(req,imageSubmit, callback)=>{
        callback(null,'./uploads')
    },
    filename:(req, imageSubmit, callback)=>{
        const name = imageSubmit.originalname.split(' ').join('_');
        console.log(name);
        const extension = MIME_TYPES[imageSubmit.mimetype];
        callback(null, name + Date.now() + '.' + extension)
    }
});

const upload = multer({ storage: storage });
const app = express();

app
.get('/', (req, res)=> {
  res.render('PictureShow.jsx');
})
.post('/', upload.any(), (req, res)=> {
    res.end('Merci !');
});

app.listen(8081);

module.exports = multer({storage})

