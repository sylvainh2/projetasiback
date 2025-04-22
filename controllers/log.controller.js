const db = require('../utils/db');

const getByEmail = async(data) =>{
    console.log("data email:",data);
    const [user,err] = await db.query("SELECT id FROM users WHERE email=?", [data]);
    if(!user){
        return null;
    }else{
        return user[0];
    }
}

module.exports = {getByEmail};