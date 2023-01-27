import joi from 'joi';

export const signUpBusinessSchema = joi.object({
  businessName: joi.string().required(),
  businessAdrdress: joi.string().required(),
  businessPhone: joi.string().required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .trim()
    .pattern(
      new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'),
      'must contain atPassword must be at least 8 characters long and  least one uppercase letter, one number, and one special character'
    )
    .min(8)
    .required(),
});
