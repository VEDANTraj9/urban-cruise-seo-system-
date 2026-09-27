const { z } = require('zod');

const contactSchema = z.object({
  phone_primary: z.string().min(1, 'Primary phone is required').max(50),
  phone_secondary: z.string().max(50).optional().nullable().or(z.literal('')),
  email: z.string().email('Please enter a valid email address').max(150),
  office_address: z.string().min(1, 'Office address is required'),
  google_map_embed: z.string().min(1, 'Google Map embed code is required')
});

module.exports = {
  contactSchema
};
