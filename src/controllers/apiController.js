const Contact = require('../models/contact');

exports.contacts_get = (req, res) => {
    Contact.find((err, contacts) => {
        if (err) console.log(err);
        res.status(200).json({
           status: 200,
           method: req.method,
           data: contacts
        });
    });
};

exports.contacts_post = (req, res) => {

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
        res.status(201).json({
           status: 201,
           method: req.method,
           data: contact
        });
    }));
};

exports.contact_get = (req, res) => {};
exports.contacts_put = (req, res) => {};
exports.contacts_delete = (req, res) => {};