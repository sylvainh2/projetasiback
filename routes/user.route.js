
const express = require('express');
const userController = require('../controllers/user.controller');
const authValidator = require('../utils/auth');

const router = express.Router();

router.route('/')
    .get(authValidator.isAuth(),async(req,res)=>{
        const users = await userController.getAll();
        if(!users){
            res.status(404).json({message:"Pas de données"})
        } else {
            res.status(200).json(users);
        }
    })

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
    // .get(authValidator.isAuth(),async(req,res)=>{
    //     const user = await userController.getById(req.params.id);
    //     if(!user || user.length===0){
    //         res.status(404).json();
    //     } else {
    //         res.status(200).json(user);
    //     }
    // })

    .patch(authValidator.isAuth(),async(req,res)=>{
        const user = await userController.update(req.params.id,req.body);
        if(!user){
            res.status(404).json();
        } else {
            res.status(202).json(user);
        }
    })

    
;

router.route('/user')
    .post(authValidator.isAuth(),async(req,res)=>{
        console.log(req.body);
        const user = await userController.getByEmail(req.body);
        if(!user){
            res.status(404).json();
        } else {
            res.status(202).json(user);
        }
    })
;
router.route('/user/:name')
    .post(authValidator.isAuth(),async(req,res)=>{
        console.log("recup et delete",req.body);
        const user = await userController.getByName(req.body);
        if(!user){
            res.status(404).json();
        } else {
            res.status(202).json(user);
        }
    })
;
router.route('/user/:id')
    .patch(authValidator.isAuth(),async(req,res)=>{
        const user = await userController.update(req.params.id,req.body);
        if(!user){
            res.status(404).json();
        } else {
            res.status(202).json(user);
        }
    })

    .delete(authValidator.isAdmin(),async(req,res)=>{
        const user = await userController.remove(req.params.id);
        if(!user){
            res.status(404).json();
        } else {
            res.status(202).json();
        }
    })
;
module.exports = router;