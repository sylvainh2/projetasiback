const db = require('../utils/db');

const getAll = async ()=>{
    console.log("2eme passe");
    const menuF = db.query("select * from galleries order by name_gal");
        return (menuF); 
}

module.exports = {getAll};