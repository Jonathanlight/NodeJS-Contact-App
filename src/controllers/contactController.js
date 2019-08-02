const {validationResult} = require('express-validator');
const Contact = require('../models/contact');

/**
 * Permet d'affiche le formulaire
 * permettant l'ajout d'un contact
 * @param req
 * @param res
 */
exports.add = (req, res) => {
    res.render("new-contact", {
        'title': 'Ajouter un contact'
    });
};

/**
 * Traitement POST du Formulaire.
 * @param req
 * @param res
 */
exports.create = (req, res) => {

    const errors = validationResult(req);
    // console.log(errors);

    // Pas d'erreur, on peux s'occuper de l'insertion !
    if (errors.isEmpty()) {

        // Création d'un objet "contact"
        const contact = new Contact({
            prenom: req.body.prenom,
            nom: req.body.nom,
            email: req.body.email,
            tel: req.body.tel,
        });

        // Sauvegarde des données
        contact.save((err => {
            if (err) console.log(err);

            // Notification Flash
            req.session.sessionFlash = {
                type: 'alert-success',
                message: 'Votre contact a été ajouté !'
            };

            // Redirection sur la fiche du contact.
            res.redirect('/contact/' + contact._id);
        }));

    } else {
        res.render("new-contact", {
            'title': 'Ajouter un contact',
            'errors': errors.array()
        });
    }

};

/**
 * Mise à jour d'un Contact
 * @param req
 * @param res
 */
exports.update_get = (req, res) => {
    Contact.findById(req.params.id, (err, contact) => {
        if(err) console.log(err);
        res.render("edit-contact", {
            'title' : 'Editer une Fiche',
            'contact': contact
        });
    });
};

/**
 * Mise à jour d'un Contact
 * @param req
 * @param res
 */
exports.update_post = (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        Contact.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, contact) => {
            if(err) console.log(err);
            // Notification Flash
            req.session.sessionFlash = {
              type: 'alert-success',
              message: 'Le contact a bien été mis à jour !'
            };
            // Redirection
            res.redirect('/contact/' + contact._id);
        });
    } else {
        Contact.findById(req.params.id, (err, contact) => {
            if(err) console.log(err);
            res.render("edit-contact", {
                'title' : 'Editer une Fiche',
                'contact': contact,
                'errors': errors.array()
            });
        });
    }
};

/**
 * Suppression d'un Contact
 * @param req
 * @param res
 */
exports.delete = (req, res) => {
    // Autre possibilité : contact.remove()...
    Contact.findByIdAndRemove(req.params.id, err => {
        if (err) {
            // Notification Flash
            req.session.sessionFlash = {
                type: 'alert-danger',
                message: 'Oooops, suppression impossible !'
            };
            res.redirect('/contacts');
        } else {
            // Notification Flash
            req.session.sessionFlash = {
                type: 'alert-success',
                message: 'Le contact a bien été supprimé !'
            };
            res.redirect('/contacts');
        }
    });
};