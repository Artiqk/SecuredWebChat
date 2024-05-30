const Joi = require('joi');

const signupSchema = Joi.object({
  username: Joi.string()
    .trim()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .label('Username')
    .messages({
      'string.min': 'Username should have a minimum length of {#limit}',
      'string.max': 'Username should have a maximum length {#limit}',
      'string.empty': 'Username cannot be an empty field',
      'any.required': 'Username is a required field'
    }),
  password: Joi.string()
    .trim()
    .min(8)
    .pattern(new RegExp('(?=.*[0-9])')) // At least one digit
    .pattern(new RegExp('(?=.*[!@#$%^&*])'))
    .label('Password')
    .messages({
      'string.min': 'Password should have a minimum length of {#limit}',
      'any.required': 'Password is a required field',
      'string.pattern.base': 'Password must include at least one digit and one special character'
    })
});

module.exports = { signupSchema };