const express = require('express');

// On importe ici tous les fichiers "route" contenus dans le 
// dossier "routes"

const multer = require("../utils/multer-config");
const authRoute = require('./auth.route');
const signRoute = require('./sign.route');
const userRoute = require('./user.route');
const pictureRoute = require('./picture.route');
const galleryRoute = require('./gallery.route');
const uploadRoute = require('./upload.route');
const menuRoute = require('./menu.route');
const profileRoute = require('./profile.route');
const upfile = require('../utils/fileup');
const certifRoute = require('./certif.route');
const certup = require('../utils/certup');
const comsRoute = require('./parent.route');

// Comme sur app.js, on appelle le router de Express...
const router = express.Router();

// ... et on pointe chaque entité vers la bonne sous-route.

router.use('/login', authRoute);
router.use('/signup', signRoute);
router.use('/users', userRoute);
router.use('/photos', pictureRoute);
router.use('/galleryupload',galleryRoute);
router.use('/upload', multer, uploadRoute);
router.use('/menu', menuRoute);
router.use('/profile', upfile, profileRoute);
router.use('/certif', certup, certifRoute);
router.use('/coms', comsRoute);

// On exporte le router pour le rendre accessible en faisant un 
// require de ce fichier.

module.exports = router;