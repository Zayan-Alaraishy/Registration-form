import joi from 'joi';

export const signUpIndiviualSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  address: joi.string().required(),
  phone: joi.string().required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .trim()
    .pattern(new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
    .message(
      'must contain atPassword must be at least 8 characters long and  least one uppercase letter, one number, and one special character'
    )
    .min(8)
    .required(),
  gender: joi.string().valid('Male', 'Female', 'Other').required(),
  birthdate: joi
    .date()
    .greater(Date.now() - 18)
    .message('Must be above 18 years old'),
});
