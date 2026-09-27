const { z } = require('zod');

const booleanField = z.preprocess((val) => {
  if (typeof val === 'boolean') return val;
  if (val === 1 || val === '1' || val === 'true') return true;
  if (val === 0 || val === '0' || val === 'false') return false;
  return Boolean(val);
}, z.boolean());

const vehicleSchema = z.object({
  name: z.string().min(1, 'Vehicle name is required').max(150),
  image: z.string().min(1, 'Vehicle image URL is required'),
  seating_capacity: z.coerce.number().int().positive('Seating capacity must be a positive number'),
  description: z.string().min(1, 'Description is required'),
  features: z.array(z.string()).default([]),
  display_order: z.coerce.number().int().default(0),
  is_active: booleanField.default(true)
});

const vehicleUpdateSchema = vehicleSchema.partial();

const reorderVehiclesSchema = z.object({
  items: z.array(
    z.object({
      id: z.number().int().positive(),
      display_order: z.number().int()
    })
  ).min(1, 'At least one item is required for reordering')
});

module.exports = {
  vehicleSchema,
  vehicleUpdateSchema,
  reorderVehiclesSchema
};
