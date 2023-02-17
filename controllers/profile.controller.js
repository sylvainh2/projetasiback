const db = require('../utils/db');

const update = async(id,data)=>{
    const [req,err] = await db.query("UPDATE users SET profil_picture=? WHERE id=? LIMIT 1",[data,id]);
    if (!req){;
        return false;
    } else {
        return true
    }
}

module.exports = {update};