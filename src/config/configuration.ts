export default () => ({
  env: process.env.NODE_ENV,
  port: +process.env.PORT || 3002,
  database: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  redis: {
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    db: +process.env.REDIS_DB_INDEX,
  },
  jwt: {
    key: process.env.JWT_KEY,
    accessTokenTtl: +process.env.JWT_ACCESS_EXPIRES_IN,
    refreshTokenTtl: +process.env.JWT_REFRESH_EXPIRES_IN,
  },
});
