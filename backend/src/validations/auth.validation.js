const { z } = require('zod');

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

module.exports = {
  loginSchema
};
