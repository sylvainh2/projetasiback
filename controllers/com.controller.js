const db = require("../utils/db");

const getAll = async(data)=>{
    const [parentCom,err] = await db.query("select * from coms where id_parent is null and photo_id=? order by creation_date desc",[data])
    if (!parentCom || parentCom.length===0){
        return(null)
    } else {
        return (parentCom)
    }
}
const getChild = async(photo,parent)=>{
    const [childCom,err] = await db.query("select * from coms where id_parent is not null and photo_id=? and id_parent=? order by creation_date desc",[photo,parent])
    if (!childCom || childCom.length===0){
        return (null)
    } else {
        return (childCom)
    }
}
const add = async(data)=>{
    const [parentCom,err] = await db.query("INSERT INTO coms (id_parent,user_id,creation_date,coms,news_id,event_id,photo_id) VALUES (?,?,NOW(),?,?,?,?)",[data.id_parent,data.user_id,data.coms,data.news_id,data.event_id,data.photo_id])
    if (!parentCom || parentCom.length===0){
        return(null)
    } else {
        return getAll()
        // return({message:"com créé"})
    }
}

module.exports = {
    getAll,
    getChild,
    add
};