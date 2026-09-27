const { z } = require('zod');

const updateHeroSchema = z.object({
  main_heading: z.string().min(1, 'Main heading is required').max(255),
  sub_heading: z.string().min(1, 'Sub heading is required'),
  banner_image: z.string().min(1, 'Banner image URL is required'),
  cta_text: z.string().min(1, 'CTA text is required').max(100),
  cta_url: z.string().min(1, 'CTA URL is required').max(500)
});

const updateAboutSchema = z.object({
  section_title: z.string().min(1, 'Section title is required').max(255),
  description: z.string().min(1, 'Description is required'),
  featured_image: z.string().min(1, 'Featured image URL is required')
});

module.exports = {
  updateHeroSchema,
  updateAboutSchema
};
