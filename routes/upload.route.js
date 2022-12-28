const express = require('express');
const multer  = require('multer');
const fs = require('fs').promises;
const port = 8080;

const upload = multer({
    dest:"uploads/"
});

const app = express();

app.post("/uploads",upload.single('imageSubmit'),async(req,res)=>{
    const {filename,filetype} = await renameFileFromMimeType (req.file);

    res.status(200).json({
        imageSubmit:filename,
        filetype
    })
})

const renameFileFromMimeType = async(file)=>{
    let ext=null;
    let filetype=null;
    switch(file.mimetype){
        case "image/jpeg": ext=".jpg"
            filetype="image"
            break
        case "image/png": ext=".png"
            filetype="image"
            break
        case "application/pdf": ext=".pdf"
            filetype="pdf"
            break
        default:ext="";
    }
    // a voir si on laisse uploads dans le nouveau nom
    const newFilename = "uploads/${file.filename}${ext}";
    await fs.rename(file.path,newFilename)
    return{
        filetype:ext,
        filename:newFilename}

}

app.listen(port,()=>{
    console.log('server up on:',port);
})
