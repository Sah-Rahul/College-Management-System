import mongoose from "mongoose";
import config from "./index.js";
import logger from "./logger.js";

/**
 * MongoDB Connection Manager
 */
class MongoConnection {
  constructor() {
    this.connection = null;
  }

  /**
   * Establish MongoDB connection
   * @returns {Promise<import("mongoose").Connection>}
   */
  async connect() {
    try {
      if (this.connection) {
        logger.info("MongoDB already connected");
        return this.connection;
      }

      const conn = await mongoose.connect(config.mongo.uri, {
        dbName: config.mongo.dbName,
      });

      this.connection = conn.connection;

      logger.info(`MongoDB connected: ${this.connection.host}`);

      this.connection.on("error", (err) => {
        logger.error("MongoDB connection error", { error: err.message });
      });

      this.connection.on("disconnected", () => {
        logger.warn("MongoDB disconnected");
      });

      return this.connection;
    } catch (error) {
      logger.error("MongoDB connection failed", { error: error.message });
      throw error;
    }
  }

  /**
   * Disconnect MongoDB
   * @returns {Promise<void>}
   */
  async disconnect() {
    try {
      if (!this.connection) {
        logger.warn("MongoDB not connected");
        return;
      }

      await mongoose.disconnect();
      this.connection = null;

      logger.info("MongoDB disconnected successfully");
    } catch (error) {
      logger.error("MongoDB disconnection failed", { error: error.message });
      throw error;
    }
  }

  /**
   * Get current MongoDB connection instance
   * @returns {import("mongoose").Connection | null} Active connection or null if not connected
   */
  getCurrentConnection() {
    return this.connection;
  }
}

export default new MongoConnection();
