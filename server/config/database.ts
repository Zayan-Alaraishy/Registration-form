import joi from 'joi';
const databaseSchema = joi
  .object({
    DB_URL: joi.string().required(),
  })
  .unknown();

interface DatabaseUrl {
  url: string;
}

export const database = (): DatabaseUrl => {
  const { error, value } = databaseSchema.validate(process.env);

  if (error) throw new Error(`database validate error ${error}`);
  return {
    url: value.DB_URL,
  };
};
