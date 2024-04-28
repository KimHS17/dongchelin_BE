export default () => ({
  env: process.env.NODE_ENV,
  port: +process.env.PORT || 3002,
  db: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  jwt: {
    key: process.env.JWT_KEY,
    accessTtl: process.env.JWT_ACCESS_EXPIRES_IN,
    refreshTtl: process.env.JWT_REFRESH_EXPIRES_IN,
  },
});
