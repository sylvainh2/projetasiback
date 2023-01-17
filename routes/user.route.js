
const express = require('express');
const userController = require('../controllers/user.controller');
const authValidator = require('../utils/auth');
const usermodSchema = require('../models/usermod');
const userdelSchema = require('../models/userdel');
const validator = require('../utils/validator.js');

const router = express.Router();

// sur le chemin /api/users avec la méthode "get" on va lire ici tous les users en BDD,
// après vérification d'authentification de connexion par authValidathor, grâce
// au controller userController avec la methode getAll, qui va aller faire la requete SQL adéquat.
// ensuite on vérifie le résultat de cette demande et en fonction on retourne
// soit une message d'erreur, soit un tableau d'objets contenant les données des users
router.route('/')
    .get(authValidator.isAuth(),async(req,res)=>{
        const users = await userController.getAll();
        if(!users){
            res.status(404).json({message:"Pas de données"})
        } else {
            res.status(200).json(users);
        }
    })

// ici on enchaine les demandes pour ne pas avoir à respécifier la route, donc on fait une demande de
// création de user avec une méthode "put" sans validation car c'est une inscription, avec la
// méthode "add" du controller auquel on passe les données du front dans le "body"
    .put(async(req,res)=>{
        const new_user = await userController.add(req.body);
        if(!new_user){
            res.status(404).json();
        } else {
            res.status(201),json(new_user);
        }
    })
;

router.route('/:id')
    .get(authValidator.isAuth(),async(req,res)=>{
        const user = await userController.getById(req.params.id);
        if(!user || user.length===0){
            res.status(404).json();
        } else {
            res.status(200).json(user);
        }
    })

//     .patch(authValidator.isAuth(),async(req,res)=>{
//         const user = await userController.update(req.params.id,req.body);
//         if(!user){
//             res.status(404).json();
//         } else {
//             res.status(202).json(user);
//         }
//     })

    
;

// router.route('/user/:id')
//     .get(authValidator.isAuth(),async(req,res)=>{
//         console.log(req.params.id);
//         const user = await userController.getById(req.params.id);
//         if(!user){
//             res.status(404).json();
//         } else {
//             res.status(202).json(user);
//         }
//     })
// ;
router.route('/user/:name')
    .get(authValidator.isAuth(),async(req,res)=>{
        const user = await userController.getByName(req.params.name.split('&')[0],req.params.name.split('&')[1]);
        if(!user || user.length===0){
            res.status(404).json();
        } else {
            res.status(202).json(user);
        }
    })
;
router.route('/user/:id')
    .patch(authValidator.isAuth(),validator(usermodSchema),async(req,res)=>{
        const user = await userController.update(req.params.id,req.body);
        if(!user || user.length===0){
            res.status(404).json();
        } else {
            res.status(201).json(user);
        }
    })

    .delete(authValidator.isAdmin(),async(req,res)=>{
        const user = await userController.remove(req.params.id);
        if(!user || user.length===0){
            res.status(404).json();
        } else {
            res.status(202).json();
        }
    })
;
router.route('/user')
    .patch(authValidator.isAdmin(),validator(userdelSchema),async(req,res)=>{
        console.log("oh non!!!");
        const user = await userController.getByName(req.body.name,req.body.first_name);
        if(!user || user.length==0){
            res.status(404);
        } else {
            if(!(req.body.validity)){
                req.body.validity = user.validity;
            }
            if(!(req.body.roles)){
                req.body.roles = user.roles;
            }
            console.log(req.body.validity,req.body.roles);
            const new_user = await userController.updateVal(user.id,req.body);
            if (!new_user || new_user.length==0){
                res.status(404).json();
            } else {
                res.status(201).json()
            }

        }
    })
module.exports = router;