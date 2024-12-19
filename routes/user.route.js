
const express = require('express');
const userController = require('../controllers/user.controller');
const runController = require('../controllers/run.controller');
const inscriptionController = require('../controllers/inscription.controller.js');
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
            console.log('users',users);
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
;
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
        const new_user = await userController.updateVal(req.body.id,req.body);
        if (!new_user || new_user.length==0){
            res.status(404).json();
        } else {
            //modification avec new_user
            res.status(201).json(new_user);
        }
    })
router.route('/user/run/:id')
    .get(authValidator.isAuth(),async(req,res)=>{
        const run_list = await runController.getAll(req.params.id);
        if (!run_list || run_list.length===0){
            res.status(404).json();
        } else {
            res.status(201).json(run_list);
        }
    })
    .delete(authValidator.isAuth(),async(req,res)=>{
        const runDelete = await runController.remove(req.params.id);
        if (!runDelete || runDelete.length===0){
            res.status(404).json();
        } else {
            res.status(201).json();
        }
    })

router.route('/user/run')
    .put(authValidator.isAuth(),async(req,res)=>{
        const run_post = await runController.add(req.body);
        if (!run_post || run_post.length===0){
            res.status(404).json();
        } else {
            res.status(201).json();
        }
    })

router.route('/user/inscription/:id')
    .patch(authValidator.isAdmin(),async(req,res)=>{
        const data = JSON.stringify(req.body.inscription);
        const medical_valid = await inscriptionController.update(data,req.params.id);
        if (!medical_valid || medical_valid.length===0){
            res.status(404).json();
        } else {
            res.status(201).json();
        }
    })
module.exports = router;