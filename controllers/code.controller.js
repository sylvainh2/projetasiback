const db = require('../utils/db');

const update = async (id, data)=>{
    const [req, err] = await db.query("UPDATE users SET code = ? where id = ? LIMIT 1",[data.codeValidation, id]);
    if(!req){
        return null;
    } else {
        return id;
    }
}

module.exports = {
    update
}