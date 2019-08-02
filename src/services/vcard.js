const vCardJS = require('vcards-js');

/**
 * Permet la génération des vCards
 * @type {{generate: (function(*): {birthday, lastName, note, role, gender, workEmail, formattedName, nameSuffix, source, title, uid, getFormattedString, getMajorVersion, saveToFile, namePrefix, nickname, logo, email, homeFax, homeAddress, homePhone, photo, workFax, workAddress, version, url, firstName, pagerPhone, organization, workUrl, middleName, workPhone, socialUrls, cellPhone})}}
 */
module.exports = {
  generateVCard: contact => {
      const vCard = vCardJS();
      vCard.firstName = contact.prenom;
      vCard.lastName = contact.nom;
      vCard.email = contact.email;
      vCard.workPhone = contact.tel;
      return vCard;
  }
};