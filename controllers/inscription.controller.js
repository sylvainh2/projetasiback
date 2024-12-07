const db = require('../utils/db');

const update = async(data,id) =>{
    const [user,err] = await db.query ("UPDATE users SET inscription=? WHERE id=? LIMIT 1",[data,id]);
    if(!user || user.length === 0){
        return (null);
    } else {
        return (user);
    }
}

module.exports = {update};