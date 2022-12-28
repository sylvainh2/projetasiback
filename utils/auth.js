// on fait appel au fichier config et on importe jsonwebtoken
const config = require('../config');
const jwt = require('jsonwebtoken');

const isAuth = () => {
    return (req, res, next) => {
        // on lit les headers
        const header = req.headers.authorization;
        
        if (!header) {
            res.status(401).json({message: "Vous devez être connecté"});
        }

        const access_token = header.split(" ")[1];

        // Le header doit être de la forme :
        // "Authorization: Bearer {token}"

        // on vérifie si le token est toujours valide, et si c'est notre serveur qui l'a 
        // signé (grace au mot de passe jwt dans le config.json)
        jwt.verify(access_token, config.jwtPass, (err, decodedToken) => {
            if (err) {
                res.status(401).json({message: "JWT invalide"});
            } else {
                // on rajoute le token décodé dans la requete
                req.auth = decodedToken;
                // on passe a la suite de la requete
                next();
            }
        });
    }
};

const isAdmin = () => {
    return (req, res, next) => {
        const header = req.headers.authorization;
        
        if (!header) {
            res.status(401).json({message: "Vous devez être connecté"});
        } else {

        const access_token = header.split(" ")[1];


        jwt.verify(access_token, config.jwtPass, (err, decodedToken) => {
            if (err) {
                res.status(401).json({message: "JWT invalide"});
            } else if (decodedToken.roles == 'admin') {
                // on rajoute le token décodé (i.e. les données de l'utilisateur) dans la requete
                req.auth = decodedToken;
                // on valide que si user est "admin" dans son token
                next();
            } else {
                res.status(401).json({message: "Vous devez être administrateur"});
            }
        })};
    }
};

module.exports = {
    isAuth,
    isAdmin
};