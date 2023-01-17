const bcrypt = require('bcrypt');
const db = require('../utils/db');

const getAll = async() => {
    const [users,err] = await db.query ("SELECT * FROM users");
    return (users);
};

const getById = async(id) => {
    console.log(id);
    const [user,err] = await db.query ("SELECT * FROM users WHERE id=?",[id]);
    if(!user || user.length === 0){
        return (null);
    } else {
        console.log(user[0].birthdate);
        return (user[0]);
    }
};

const getByName = async(name,first_name) => {
    const [user,err] = await db.query ("SELECT * FROM users WHERE name=? and first_name=?",[name,first_name]);
    if(!user || user.length === 0){
        return null;
    } else {
        console.log("recupéré");
        return (user[0]);
    }
};

const add = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const [req, err] = await db.query("INSERT INTO users (email, password, first_name, name, birthdate, address, postcode, city, tel, profil_picture, certif_med, validity, validity_certif_date, roles, share_infos) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", 
    [data.email, hashedPassword, data.first_name, data.name, data.birthdate, data.address, data.postcode, data.city, data.tel,'','','0','2000-01-01', 'user',data.share_infos]);
    if (!req) {
        return null;
    } else {
        // Après l'ajout en bdd du nouvel user, on récupère les données de ce user créé.
        return getById(req.insertId);
    }

};

const update = async (id, data) => {
    console.log("update/");
    // Pour update, on va d'abord chercher en base le user correspondant
    const user = await getById(id);
    console.log("getbyid");
    if (!user) {
        return null;
    } else {
        let password;
        if (data.password) {
            password = await bcrypt.hash(data.password, 10);
        } else {
            password = user.password;
        }
        console.log("on va updater");
        // On met à jour, en réécrivant les champs potentiellement manquant, grace au user récupéré
        const [req, err] = await db.query("UPDATE users SET name=?, first_name=?, birthdate=?, address=?, postcode=?, city=?, tel=?,email = ?, profil_picture=?, certif_med=?, validity=?, share_infos=?, roles=?, validity_certif_date=?, password = ? WHERE id = ? LIMIT 1", 
        [
            data.name || user.name,
            data.first_name || user.first_name,
            data.birthdate || user.birthdate,
            data.address || user.address,
            data.postcode || user.postcode,
            data.city || user.city,
            data.tel || user.tel,
            data.email || user.email,
            data.profil_picture || user.profil_picture,
            data.certif_med || user.certif_med,
            data.validity || user.validity,
            data.share_infos || user.share_infos,
            data.roles || user.roles,
            data.validity_certif_date || user.validity_certif_date,
            password,
            id
        ]);
        if (!req) {
            return null;
        };
        // Finalement, on retourne le user modifié

        return getById(id);
    } 
};
const remove = async (id) => {
    const [req, err] = await db.query("DELETE FROM users WHERE id = ? LIMIT 1", [id]);
    // Si la suppresion a fonctionné, on renvoie "true", sinon "false"
    if (!req) {
        return false;
    }
    return true;
};

const getByEmailAndPassword = async (data) => {
    const user = await getByEmail(data);
    if (!user) { 
        return null;
    }
    console.log("user");
    const hashedPassword = await bcrypt.compare(data.password, user.password);
    
    if (hashedPassword) {
        return user; 
    } else {
        return null;
    }
};

const updateVal =async(id,data) => {
    const [user,err] = await db.query("UPDATE users SET validity=?, roles=? WHERE id=? LIMIT 1",[data.validity, data.roles,id]);
    if (!user) {
        return null;
    } else {
        return true;
    }
}
const getByEmail = async (data) => {
    console.log(data.email);
    const [user, err] = await db.query("SELECT * FROM users WHERE email = ?", [data.email]);
    if (!user || user.length == 0) {
        return null;
    } else {
        return user[0];
    }
}

module.exports = {
    getAll,
    getById,
    add,
    update,
    updateVal,
    remove,
    getByEmailAndPassword,
    getByEmail,
    getByName
};