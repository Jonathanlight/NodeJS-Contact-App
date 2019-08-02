const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

// -- Importation de nos controleurs
const default_controller = require('../controllers/defaultController');
const contact_controller = require('../controllers/contactController');

// -- Chargement des routes
router.get('/', default_controller.index);
router.get('/contacts', default_controller.contacts);

router.get('/contact/:id', default_controller.contact);
router.get('/contact/:id/delete', contact_controller.delete);
router.get('/contact/:id/edit', contact_controller.update_get);
router.post('/contact/:id/edit', [
    check('prenom').trim().not().isEmpty().withMessage('Vous devez saisir le prénom.'),
    check('nom').trim().not().isEmpty().withMessage('Vous devez saisir le nom.'),
    check('email').trim().normalizeEmail().not().isEmpty().withMessage('Vous devez saisir un email.').isEmail().withMessage('Le format de votre email est incorrect'),
    check('tel').blacklist(' ').isMobilePhone('fr-FR').withMessage('Vérifiez le format de votre numéro de téléphone.')
], contact_controller.update_post);

router.get('/ajouter-un-contact', contact_controller.add);
router.post('/ajouter-un-contact', [
    check('prenom').trim().not().isEmpty().withMessage('Vous devez saisir le prénom.'),
    check('nom').trim().not().isEmpty().withMessage('Vous devez saisir le nom.'),
    check('email').trim().normalizeEmail().not().isEmpty().withMessage('Vous devez saisir un email.').isEmail().withMessage('Le format de votre email est incorrect'),
    check('tel').blacklist(' ').isMobilePhone('fr-FR').withMessage('Vérifiez le format de votre numéro de téléphone.')
], contact_controller.create);

// -- Exportation du module router avec nos routes.
module.exports = router;