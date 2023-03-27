const db = require('../utils/db');

const getAll = async()=>{
    const [pictures,err] = await db.query ("SELECT * FROM photos INNER JOIN galleries ON (gallery_id = galleries.id_gall) inner join users on (user_id = users.id) order by id_pic desc limit 10");
    const [pcount,error] = await db.query ("select count(id_pic) FROM photos");
    console.log('pcount',pcount[0]);
    return([pictures,pcount[0]]);
};

const getByDate = async(data)=>{
    const [pictures,err] = await db.query ("SELECT * FROM photos INNER JOIN galleries ON (gallery_id = galleries.id_gall) inner join users on(user_id=users.id) WHERE creation_date=? order by creation_date desc",[data]);
    if(!pictures || pictures.length === 0){
        return(null);
    } else {
        return (pictures);
    }
};

const getById = async(data)=>{
    const [pictures,err] = await db.query ("SELECT * FROM photos WHERE id_pic=?",[data]);
    if(!pictures || pictures.length === 0){
        return(null);
    } else {
        return (pictures);
    }
};

const getByGallery = async(data)=>{

    const[pictures,err] = await db.query("SELECT * FROM photos INNER JOIN galleries ON (gallery_id = galleries.id_gall) inner join users on (user_id = users.id) WHERE name_gal=? order by creation_date desc",[data]);
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
    const[pictures,err] = await db.query("SELECT * FROM photos INNER JOIN galleries ON (gallery_id = galleries.id_gall) inner join users on (user_id = users.id) WHERE name_gal=? AND creation_date=? order by creation_date desc",[reqGallery,reqDate]);
    if(!pictures || pictures.length === 0){
        return(null);
    } else {
        return(pictures);
    }
};

const add = async(data)=>{
    console.log("data",data.picture,data.gallery_id,data.user_id,data.title);
    const [new_picture,err] = await db.query("INSERT INTO photos (picture,creation_date,gallery_id,user_id,title) VALUES (?,NOW(),?,?,?) LIMIT 1",[data.picture,data.gallery_id,data.user_id,data.title]);
    if(!new_picture || new_picture.length === 0){
        return null;
    } else {
        return getAll();
    }
};

const remove = async(id)=>{

    const [req,err] = await db.query("DELETE FROM photos WHERE id_pic=? LIMIT 1",[id]);
    if(!req){
        return false;
    } else {
        return getAll();
    }

};

const update = async(id)=>{

    const [req,res] = await db.query("update photos set user_id=0 where user_id=?",[id]);
}

module.exports = {
    getAll,
    getById,
    getByDate,
    getByGallery,
    getByGalleryDate,
    remove,
    update,
    add
};