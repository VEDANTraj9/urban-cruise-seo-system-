const ContactService = require('../services/contact.service');

class ContactController {
  static async get(req, res, next) {
    try {
      const contact = await ContactService.getContactInfo();
      return res.status(200).json({
        success: true,
        data: contact
      });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const updated = await ContactService.updateContactInfo(req.body);
      return res.status(200).json({
        success: true,
        message: 'Contact information updated successfully',
        data: updated
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ContactController;
