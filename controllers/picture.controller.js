const db = require('../utils/db');

const getAll = async(page)=>{
    const [pictures,err] = await db.query ("SELECT * FROM photos INNER JOIN galleries ON (gallery_id = galleries.id_gall) inner join users on (user_id = users.id) order by id_pic desc LIMIT 10 offset ?",[page*10]);
    const [pcount,error] = await db.query ("select count(id_pic) FROM photos");
    if(!pictures || pictures.length === 0){
        return(null);
    } else {
        return([pictures,pcount[0]]);
    }
};

const getByDate = async(date,page)=>{
    const [pictures,err] = await db.query ("SELECT * FROM photos INNER JOIN galleries ON (gallery_id = galleries.id_gall) inner join users on(user_id=users.id) WHERE creation_date=? order by creation_date desc LIMIT 10 offset ?",[date,page*10]);
    const [pcount,error] = await db.query ("select count(id_pic) FROM photos WHERE creation_date=?",[date]);
    if(!pictures || pictures.length === 0){
        return(null);
    } else {
        return([pictures,pcount[0]]);
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

const getByGallery = async(gal,page)=>{

    const[pictures,err] = await db.query("SELECT * FROM photos INNER JOIN galleries ON (gallery_id = galleries.id_gall) inner join users on (user_id = users.id) WHERE name_gal=? order by creation_date desc LIMIT 10 offset ?",[gal,page]);
    const [pcount,error] = await db.query ("select count(id_pic) FROM photos INNER JOIN galleries ON (gallery_id = galleries.id_gall) WHERE name_gal=?",[gal]);
    console.log(pictures);
    if(!pictures || pictures.length === 0){
        return(null);
    } else {
        return([pictures,pcount[0]]);
    }
};

const getByGalleryDate = async(gal,date,page)=>{

    // let reqGallery = data.split("&")[0];
    // let reqDate = data.split("&")[1];
    const[pictures,err] = await db.query("SELECT * FROM photos INNER JOIN galleries ON (gallery_id = galleries.id_gall) inner join users on (user_id = users.id) WHERE name_gal=? AND creation_date=? order by creation_date desc LIMIT 10 offset ?",[gal,date,page*10]);
    const [pcount,error] = await db.query ("select count(id_pic) FROM photos INNER JOIN galleries ON (gallery_id = galleries.id_gall) WHERE name_gal=? AND creation_date=?",[gal,date]);
    if(!pictures || pictures.length === 0){
        return(null);
    } else {
        return([pictures,pcount[0]]);
    }
};

const add = async(data,page)=>{
    console.log("data",data.picture,data.gallery_id,data.user_id,data.title);
    const [new_picture,err] = await db.query("INSERT INTO photos (picture,creation_date,gallery_id,user_id,title) VALUES (?,NOW(),?,?,?) LIMIT 1",[data.picture,data.gallery_id,data.user_id,data.title]);
    if(!new_picture || new_picture.length === 0){
        return null;
    } else {
        return getAll(page);
    }
};

const remove = async(id,page)=>{

    const [req,err] = await db.query("DELETE FROM photos WHERE id_pic=? LIMIT 1",[id]);
    if(!req){
        return false;
    } else {
        return getAll(page);
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