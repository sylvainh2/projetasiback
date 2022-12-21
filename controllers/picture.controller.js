const db = require('../utils/db');

const getAll = async()=>{
    const [pictures,err] = await db.query ("SELECT * FROM photos");
    return(pictures);
};

const getByDate = async(data)=>{
    const [pictures,err] = await db.query ("SELECT * FROM photos WHERE creation_date=?",[data]);
    if(!pictures || pictures.length === 0){
        return(null);
    } else {
        return (pictures);
    }
};

const getById = async(data)=>{
    const [pictures,err] = await db.query ("SELECT * FROM photos WHERE id=?",[data]);
    if(!pictures || pictures.length === 0){
        return(null);
    } else {
        return (pictures);
    }
};

const getByGallery = async(data)=>{

    const[pictures,err] = await db.query("SELECT * FROM photos INNER JOIN galleries ON (gallery_id = galleries.id_gall) WHERE name=?",[data]);
    console.log(pictures);
    if(!pictures || pictures.length === 0){
        return(null);
    } else {
        return(pictures);
    }
};

const getByGalleryDate = async(data)=>{

    let reqGallery = data.split("&")[0];
    let reqDate = data.split("&")[1];
    const[pictures,err] = await db.query("SELECT * FROM photos INNER JOIN galleries ON (gallery_id = galleries.id_gall) WHERE name=? AND creation_date=?",[reqGallery,reqDate]);
    if(!pictures || pictures.length === 0){
        return(null);
    } else {
        return(pictures);
    }
};

const remove = async(id)=>{

    const [req,err] = await db.query("DELETE FROM photos WHERE id=? LIMIT 1",[id]);
    if(!req){
        return false;
    } else {
        return true;
    }

};

module.exports = {
    getAll,
    getById,
    getByDate,
    getByGallery,
    getByGalleryDate,
    remove
};