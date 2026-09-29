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

      // Dynamically resolve full URL using server host or BASE_URL
      const host = req.get('host') || 'urban-cruise-backend.onrender.com';
      const isHttps = req.secure || req.headers['x-forwarded-proto'] === 'https' || host.includes('onrender.com');
      const protocol = isHttps ? 'https' : (req.protocol || 'http');
      const origin = (env.BASE_URL && !env.BASE_URL.includes('localhost'))
        ? env.BASE_URL.replace(/\/+$/, '')
        : `${protocol}://${host}`;

      const relativeUrl = `/uploads/${req.file.filename}`;
      const fullUrl = `${origin}${relativeUrl}`;

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
