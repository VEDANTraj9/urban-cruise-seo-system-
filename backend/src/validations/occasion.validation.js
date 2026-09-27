const { z } = require('zod');

const booleanField = z.preprocess((val) => {
  if (typeof val === 'boolean') return val;
  if (val === 1 || val === '1' || val === 'true') return true;
  if (val === 0 || val === '0' || val === 'false') return false;
  return Boolean(val);
}, z.boolean());

const occasionSchema = z.object({
  title: z.string().min(1, 'Title is required').max(150),
  description: z.string().min(1, 'Description is required'),
  image: z.string().min(1, 'Image URL is required'),
  display_order: z.coerce.number().int().default(0),
  is_active: booleanField.default(true)
});

const occasionUpdateSchema = occasionSchema.partial();

module.exports = {
  occasionSchema,
  occasionUpdateSchema
};
