const certup = require('multer');

const storage = certup.diskStorage({
    destination:(req,file, callback)=>{
        callback(null,'certifs')
    },
    filename:(req, file, callback)=>{
        const name = file.originalname;
        callback(null, name)
    }
});

module.exports = certup({storage: storage}).single("file");