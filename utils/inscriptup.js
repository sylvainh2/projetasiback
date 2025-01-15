const inscriptup = require('multer');

const storage = inscriptup.diskStorage({
    destination:(req,file, callback)=>{
        callback(null,'inscriptions')
    },
    filename:(req, file, callback)=>{
        const name = file.originalname;
        callback(null, name)
    }
});

module.exports = inscriptup({storage: storage}).single("file");