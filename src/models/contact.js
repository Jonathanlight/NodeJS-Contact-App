const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Création d'un schéma de données Mongo
 */
const ContactSchema = Schema({
   prenom: String,
   nom: String,
   email: String,
   tel: String,
   dateCreation: {type: Date, default: Date.now()}
});

/**
 * Exportation du Model Contact
 * https://mongoosejs.com/docs/models.html
 * @type {Model}
 */
module.exports = mongoose.model('Contact', ContactSchema);