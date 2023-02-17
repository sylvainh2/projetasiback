const upfile = require('multer');

const storage = upfile.diskStorage({
    destination:(req,file, callback)=>{
        callback(null,'profiles')
    },
    filename:(req, file, callback)=>{
        const name = file.originalname;
        callback(null, name)
    }
});

module.exports = upfile({storage: storage}).single("file");