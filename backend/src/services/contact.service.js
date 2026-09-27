const ContactModel = require('../models/contact.model');

class ContactService {
  static async getContactInfo() {
    const info = await ContactModel.get();
    if (!info) {
      return {
        phone_primary: '',
        phone_secondary: '',
        email: '',
        office_address: '',
        google_map_embed: ''
      };
    }
    return info;
  }

  static async updateContactInfo(data) {
    return await ContactModel.update(data);
  }
}

module.exports = ContactService;
