const db = require("../utils/db");

const getAll = async(data)=>{
    const [parentCom,err] = await db.query("select * from coms join users on coms.user_id=users.id left join reactions on reactions.id_reaction=coms.reaction_id where coms.id_parent is null and coms.photo_id=? order by coms.creation_date desc",[data])
    if (!parentCom || parentCom.length===0){
        return(null)
    } else {
        return (parentCom)
    }
}
const getChild = async(photo,parent)=>{
    const [childCom,err] = await db.query("select * from coms join users on coms.user_id=users.id left join reactions on reactions.id_reaction=coms.reaction_id where coms.id_parent is not null and coms.photo_id=? and coms.id_parent=? order by coms.creation_date desc",[photo,parent])
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
        // return getAll(data.photo_id);
        return({message:"com créé"});
    }
}
const removeChild =async(com,react)=>{
    if(react!==null){
        const rReact = removeReact(react);
        if(!rReact || rReact.length===0){
            return(null)
        }
    }
    const [childComDel,err] = await db.query("DELETE FROM coms WHERE id_com=?",[com])
    if (!childComDel || childComDel.length===0){
        return(null)
    } else {
        return({message:"commentaire effacé"});
    }
}
const removeChildren = async(photo,parent)=>{
    const [childComDel,err] = await db.query("DELETE FROM coms WHERE id_parent=? and photo_id=?",[parent,photo])
    if (!childComDel || childComDel.length===0){
        return(null)
    }
    return (removeChild(parent));
}
const removeReact = async(react)=>{
    const [reactDel,err] = await db.query("DELETE FROM reactions WHERE id_reaction=?",[react]);
    if(!reactDel || reactDel.length===0){
        return(null)
    } else {
        return(true)
    }
}
const updateCom = async(data,id)=>{
    const [comMod,err] = await db.query("UPDATE coms SET coms=? WHERE id_com=? LIMIT 1",[data.coms,id]);
    if (!comMod || comMod.length===0){
        return(null)
    } else {
        return({message:"commentaire modifié"});
    }
}

module.exports = {
    getAll,
    getChild,
    removeChild,
    removeChildren,
    removeReact,
    updateCom,
    add
};