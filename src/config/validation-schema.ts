import * as Joi from 'joi';

export const ValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'local')
    .default('development'),
  PORT: Joi.number().port().default(3000),
  TZ: Joi.string().default('UTC'),
  JWT_KEY: Joi.string().required(),
  JWT_ACCESS_EXPIRES_IN: Joi.number().default(3600),
  JWT_REFRESH_EXPIRES_IN: Joi.number().default(86400),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(3306),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
});
