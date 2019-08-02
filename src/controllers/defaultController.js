const Contact = require('../models/contact');
const qrCode = require('qrcode');
const {generateVCard} = require('../services/vcard');

/**
 * La page d'accueil
 */
exports.index = (req, res) => {
    res.redirect('/contacts');
};

/**
 * Lister les contacts
 */
exports.contacts = (req, res) => {

    /**
     * Je récupère via mon model "Contact"
     * tous les documents "contacts"
     */
    Contact.find((err, contacts) => {

        if(err) console.log(err);

        /**
         * Je retourne à la vue les
         * contacts que j'ai récupéré.
         */
        res.render("contacts", {
            'title':'Mes Contacts',
            'contacts': contacts
        });

    });

};

/**
 * Afficher un Contact
 */
exports.contact = (req, res) => {

    Contact.findById(req.params.id, (err, contact) => {

        if(err) console.log(err);

        // Generation de la vCard
        const card = generateVCard(contact);

        // Generation du qrCode
        qrCode.toDataURL(card.getFormattedString(), (err, src) => {
            res.render("contact", {
                'title': 'Fiche de ' + contact.prenom + ' ' + contact.nom,
                'contact': contact,
                'src': src
            });
        });

    });

};