const TestimonialService = require('../services/testimonial.service');

class TestimonialController {
  static async getAll(req, res, next) {
    try {
      const testimonials = await TestimonialService.getAllTestimonials();
      return res.status(200).json({
        success: true,
        data: testimonials
      });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const testimonial = await TestimonialService.getTestimonialById(req.params.id);
      return res.status(200).json({
        success: true,
        data: testimonial
      });
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const testimonial = await TestimonialService.createTestimonial(req.body);
      return res.status(201).json({
        success: true,
        message: 'Testimonial added successfully',
        data: testimonial
      });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const testimonial = await TestimonialService.updateTestimonial(req.params.id, req.body);
      return res.status(200).json({
        success: true,
        message: 'Testimonial updated successfully',
        data: testimonial
      });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      await TestimonialService.deleteTestimonial(req.params.id);
      return res.status(200).json({
        success: true,
        message: 'Testimonial deleted successfully'
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TestimonialController;
