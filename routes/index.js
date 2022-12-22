const express = require('express');

// On importe ici tous les fichiers "route" contenus dans le 
// dossier "routes"

const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const pictureRoute = require('./picture.route');
const galleryRoute = require('./gallery.route');

// Comme sur app.js, on appelle le router de Express...
const router = express.Router();

// ... et on pointe chaque entité vers la bonne sous-route.
// Ici, les routes contenues dans le fichier user.route.js pointeront vers /users
// "http://localhost/api/users"

router.use('/login', authRoute);
router.use('/users', userRoute);
router.use('/photos', pictureRoute);
router.use('/galleryupload',galleryRoute);

// On exporte le router pour le rendre accessible en faisant un 
// require de ce fichier.
// Dans app.js, lorsqu'on fait "const router = require('./routes')",
// "router" vaut ce qui est renseigné dans ce "module.exports"
module.exports = router;