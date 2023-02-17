const express = require ('express');
const menuController = require ('../controllers/menu.controller');
const authValidator = require ('../utils/auth');

const router = express.Router();

router.route('/')
    .get(authValidator.isAuth(),async(req,res) =>{
        console.log("1ere passe");
        const menus = await menuController.getAll();
        if(!menus){
            res.status(400).json(null);
        } else {
            res.status(200).json(menus);
        }      
    })
;

module.exports = router;