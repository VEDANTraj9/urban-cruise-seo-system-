const TestimonialModel = require('../models/testimonial.model');

class TestimonialService {
  static async getAllTestimonials() {
    return await TestimonialModel.getAll();
  }

  static async getActiveTestimonials() {
    return await TestimonialModel.getActive();
  }

  static async getTestimonialById(id) {
    const item = await TestimonialModel.getById(id);
    if (!item) {
      const err = new Error('Testimonial not found');
      err.status = 404;
      throw err;
    }
    return item;
  }

  static async createTestimonial(data) {
    return await TestimonialModel.create(data);
  }

  static async updateTestimonial(id, data) {
    await this.getTestimonialById(id); // Ensure exists
    return await TestimonialModel.update(id, data);
  }

  static async deleteTestimonial(id) {
    await this.getTestimonialById(id); // Ensure exists
    return await TestimonialModel.delete(id);
  }
}

module.exports = TestimonialService;
