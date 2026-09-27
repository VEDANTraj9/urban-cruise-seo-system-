const { z } = require('zod');

const booleanField = z.preprocess((val) => {
  if (typeof val === 'boolean') return val;
  if (val === 1 || val === '1' || val === 'true') return true;
  if (val === 0 || val === '0' || val === 'false') return false;
  return Boolean(val);
}, z.boolean());

const testimonialSchema = z.object({
  customer_name: z.string().min(1, 'Customer name is required').max(150),
  review: z.string().min(1, 'Review text is required'),
  rating: z.coerce.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
  customer_image: z.string().optional().nullable().or(z.literal('')),
  display_order: z.coerce.number().int().default(0),
  is_active: booleanField.default(true)
});

const testimonialUpdateSchema = testimonialSchema.partial();

module.exports = {
  testimonialSchema,
  testimonialUpdateSchema
};
