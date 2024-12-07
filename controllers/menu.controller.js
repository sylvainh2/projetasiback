const db = require('../utils/db');

const getAll = async ()=>{
    const menuF = db.query("select * from galleries order by name_gal");
        return (menuF); 
}

module.exports = {getAll};