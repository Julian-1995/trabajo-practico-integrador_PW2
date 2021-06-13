const { body } = require('express-validator');

module.exports = body('usuario_id')
  .notEmpty()
  .withMessage('Campo obligatorio')
  .bail()
  .isInt()
  .withMessage('Debe ser un número entero');