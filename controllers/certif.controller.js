const db = require('../utils/db');

const update = async(id,data)=>{
    console.log("certif",id,data);
    const [req,err] = await db.query("UPDATE users SET certif_med=? WHERE id=? LIMIT 1",[data,id]);
    if (!req){;
        return false;
    } else {
        return true
    }
}

module.exports = {update};