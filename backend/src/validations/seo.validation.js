const { z } = require('zod');

const booleanField = z.preprocess((val) => {
  if (typeof val === 'boolean') return val;
  if (val === 1 || val === '1' || val === 'true') return true;
  if (val === 0 || val === '0' || val === 'false') return false;
  return Boolean(val);
}, z.boolean());

const updateSeoSchema = z.object({
  meta_title: z.string().min(1, 'Meta Title is required').max(255),
  meta_description: z.string().min(1, 'Meta Description is required'),
  focus_keywords: z.string().optional().nullable(),
  canonical_url: z.string().url('Canonical URL must be a valid URL').optional().nullable().or(z.literal('')),
  robots_index: booleanField.default(true),
  robots_follow: booleanField.default(true),
  og_title: z.string().optional().nullable(),
  og_description: z.string().optional().nullable(),
  og_image: z.string().optional().nullable(),
  twitter_title: z.string().optional().nullable(),
  twitter_description: z.string().optional().nullable(),
  twitter_image: z.string().optional().nullable(),
  twitter_card_type: z.string().default('summary_large_image')
});

module.exports = {
  updateSeoSchema
};
