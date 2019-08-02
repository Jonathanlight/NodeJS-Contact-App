const express = require('express');
const router = express.Router();

// -- Importation de nos controleurs
const api_controller = require('../controllers/apiController');

// -- Chargement des routes
router.get('/contacts', api_controller.contacts_get);
router.post('/contacts', api_controller.contacts_post);
router.get('/contacts/:id', api_controller.contact_get);
router.put('/contacts/:id', api_controller.contacts_put);
router.delete('/contacts/:id', api_controller.contacts_delete);

// -- Exportation du module router avec nos routes.
module.exports = router;