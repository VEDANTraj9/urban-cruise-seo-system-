const { z } = require('zod');

const booleanField = z.preprocess((val) => {
  if (typeof val === 'boolean') return val;
  if (val === 1 || val === '1' || val === 'true') return true;
  if (val === 0 || val === '0' || val === 'false') return false;
  return Boolean(val);
}, z.boolean());

const upsertSchemaSchema = z.object({
  schema_type: z.enum(['Organization', 'FAQ', 'Breadcrumb', 'Website', 'LocalBusiness']),
  schema_data: z.record(z.any()),
  is_active: booleanField.default(true)
});

const toggleSchemaSchema = z.object({
  is_active: booleanField
});

module.exports = {
  upsertSchemaSchema,
  toggleSchemaSchema
};
