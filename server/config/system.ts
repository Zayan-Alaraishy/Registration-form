import joi from 'joi';
const systemSchema = joi
  .object({
    SECRET_KEY: joi.string().required(),
    PORT: joi.number().required(),
  })
  .unknown();

interface systemVariable {
  secretKey: string;
  port: number;
}
export const system = (): systemVariable => {
  const { value, error } = systemSchema.validate(process.env);

  if (error) {
    throw new Error(`validation error  ${error}`);
  }
  return {
    secretKey: value.SECRET_KEY,
    port: value.PORT,
  };
};
