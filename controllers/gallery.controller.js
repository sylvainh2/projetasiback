const db = require('../utils/db');
// const { getById } = require('./user.controller');

const getByName = async(data)=>{
    const [galleryFind,err] = await db.query ("SELECT * FROM galleries WHERE name=?",[data]);
    console.log(1,galleryFind);
    if(!galleryFind || galleryFind.length===0){
        return null
    } else {
        return(galleryFind[0])
    }
};

const add = async(data)=>{
    const [galleryPush,err] = await db.query ("INSERT INTO galleries (name) VALUES (?) LIMIT 1",[data]);
    if(!galleryPush){
        return null;
    }
    console.log(galleryPush, galleryPush.insertId);
    return getByIdGall(galleryPush.insertId);
};

const getByIdGall = async(data)=>{
    const [galleryFind,err] = await db.query ("SELECT * FROM galleries WHERE id_gall=?",[data]);
    if(!galleryFind || galleryFind.length===0){
        return null;
    }
    return galleryFind[0];
}

module.exports = {
    getByName,
    getByIdGall,
    add
};