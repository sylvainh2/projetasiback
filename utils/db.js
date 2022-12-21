// on importe le paquet mysql2 et le fichier config pour la connexion à la bdd 
const mysql = require('mysql2/promise');
const config = require('../config');

// on crée la connexion que l'on pourra appeler au besoin
const db = mysql.createPool({
    host: config.mysqlHost,
    user: config.mysqlUsername,
    password: config.mysqlPassword,
    database: config.mysqlDatabase
});

module.exports = db;