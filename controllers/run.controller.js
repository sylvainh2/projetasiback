const db = require('../utils/db');

const getAll = async(id) => {
    const [user,err] = await db.query ("SELECT * FROM runs WHERE user_id=? order by datecourse desc",[id]);
    if(!user || user.length === 0){
        return (null);
    } else {
        return (user);
    }
};
const add = async(data) => {
    const [user,err] = await db.query ("INSERT INTO runs (name, user_id, temps, datecourse, distance) VALUES (?,?,?,?,?)",[data.name, data.user_id, data.temps, data.datecourse, data.distance]);
    if(!user || user.length === 0){
        return (null);
    } else {
        return (user);
    }
}
module.exports = {
    getAll, add
}