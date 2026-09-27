const env = require('../config/env');

class UploadController {
  static async uploadFile(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded. Please provide an image file.'
        });
      }

      // Return both relative path and full URL
      const relativeUrl = `/uploads/${req.file.filename}`;
      const fullUrl = `${env.BASE_URL}${relativeUrl}`;

      return res.status(201).json({
        success: true,
        message: 'File uploaded successfully',
        data: {
          filename: req.file.filename,
          originalName: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size,
          url: fullUrl,
          relativeUrl
        }
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UploadController;
