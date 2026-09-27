const AuthService = require('../services/auth.service');

class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result
      });
    } catch (err) {
      next(err);
    }
  }

  static async me(req, res, next) {
    try {
      const profile = await AuthService.getProfile(req.user.id);
      return res.status(200).json({
        success: true,
        data: {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          role: profile.role
        }
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;
