const { z } = require('zod');

const gallerySchema = z.object({
  image_url: z.string().min(1, 'Image URL is required'),
  alt_tag: z.string().min(1, 'SEO-friendly Alt Tag is required').max(255),
  display_order: z.coerce.number().int().default(0)
});

const galleryUpdateSchema = gallerySchema.partial();

module.exports = {
  gallerySchema,
  galleryUpdateSchema
};
