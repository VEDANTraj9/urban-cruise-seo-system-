const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    try {
      const parsed = schema.parse(req[source]);
      req[source] = parsed;
      next();
    } catch (err) {
      if (err.errors) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: err.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || 'Invalid input data'
      });
    }
  };
};

module.exports = validate;
