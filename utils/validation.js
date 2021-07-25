const { validationResult, check, body } = require('express-validator');

const imageValidator = () => {
    return [
        check('size').optional().trim()
        .custom((val) => val.match(/^[1-9][0-9]*$/))
        .withMessage('Must be a number greater than zero'),
        check('offset').optional().trim()
        .custom((val) => val.match(/^[0-9][0-9]*$/))
        .withMessage('Must be a number greater than zero')
    ]
}

const todoValidator = () => {
  return [
  body('userId').trim().custom((val) => val.match(/^[1-9\b]+$/)).withMessage('Must be a number greater than zero'),
  body('title').isString().not().isEmpty().withMessage('Cant be empty'),
  body('completed').isBoolean().withMessage('Valid values are true or false')
  ]
}

const requestValidator = (req) => {
    let messages = []
    if (!validationResult(req).isEmpty()) {
      const errors = validationResult(req).array();
      errors.forEach(e => {
        messages = messages.concat(e);
      });
    }
    return messages
  }
module.exports = {  
 imageValidator,
 requestValidator,
 todoValidator
}