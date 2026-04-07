import dotenv from "dotenv";

dotenv.config();

const config = {
  node_env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "5000", 10),

  // Todo MONGODB
  mongo: {
    uri: process.env.MONGO_URI || "mongodb://localhost:27017/api_monitoring",
  },

  // Todo POSTGRES
  postgres: {
    host: process.env.PG_HOST || "localhost",
    port: parseInt(process.env.PG_PORT || "5432", 10),
    database: process.env.PG_DATABASE || "api_monitoring",
    user: process.env.PG_USER || "postgres",
    password: process.env.PG_PASSWORD || "postgres",
  },

  // Todo RABBITMQ
  rabbitmq: {
    uri: process.env.RABBITMQ_URL || "amqp://localhost:5672",
    queue: process.env.RABBITMQ_QUEUE || "api_hits",
    publishConfirms:
      process.env.RABBITMQ_PUBLISHER_CONFIRMS === "true" || false,
    retryAttempts: parseInt(process.env.RABBITMQ_RETRY_ATTEMPTS || "3", 10),
    retryDelay: parseInt(process.env.RABBITMQ_RETRY_DELAY || "1000", 10),
  },

  // Todo JWT

  jwt: {
    secret: process.env.JWT_SECRET || "6817864768d8b7a2aaad6e23678834d349136e39bb903761eca10e22c1899eff",
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
  },

  // Todo RATE_LIMIT
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOWS_MS || "900000", 10),
    maxRequest: parseInt(process.env.RATE_LIMIT_MAX_REQUEST || "1000", 20),
  },
};

export default config;
