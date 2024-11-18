export const EnvironmentVariables = {
  HOST: process.env.HOST || "http://localhost",
  PORT: process.env.PORT || "3000",
  DB_HOST: process.env.DB_HOST || "mongodb://localhost",
  DB_PORT: process.env.DB_PORT || "27017",
  DB_NAME: process.env.DB_NAME || "gdb",
  DB_USERNAME: process.env.DB_USERNAME || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  AUTH_SECRET: process.env.AUTH_SECRET || "",
  AUTH_EXPIRED_PERIOD: process.env.AUTH_EXPIRED_PERIOD || "",
};
