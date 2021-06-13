const { body } = require('express-validator');

module.exports = body('nombre')
  .trim()
  .notEmpty()
  .withMessage('Campo obligatorio')
  .bail()
  .isLength({ min: 2 })
  .withMessage('Debe contener como minimo 2 caracterés');