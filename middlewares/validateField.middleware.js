const { validationResult } = require('express-validator');

/* Un middleware que verifica si  la solicitud tiene algún error. Si hay error
devuelve un código de estado 400 con los errores. Si no hay errores, llama al siguiente middleware
función. */
exports.validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};
