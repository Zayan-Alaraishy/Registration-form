import joi from "@hapi/joi";

const calculateAge = (dateString: string): number => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const validateBirthdate = (value: string): string | undefined => {
  const age = calculateAge(value);
  if (age < 18) {
    return "You must be at least 18 years old";
  }
};

export const signUpIndiviualSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  address: joi.string().required(),
  phone: joi.string().required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .trim()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .message(
      "must contain atPassword must be at least 8 characters long and  least one uppercase letter, one number, and one special character"
    )
    .min(8)
    .required(),
  gender: joi.string().valid("Male", "Female", "Other").required(),
  birthdate: joi
    .string()
    .custom(validateBirthdate, "Birthdate validation")
    .required(),
});
