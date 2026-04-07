import amqp from "amqplib";
import config from "./index.js";
import logger from "./logger.js";

/**
 * RabbitMQ Connection Manager
 */
class RabbitMQConnection {
  constructor() {
    this.connection = null;

    this.channel = null;

    this.isConnecting = false;
  }

  /**
   * Create or get RabbitMQ channel
   * @returns {Promise<import("amqplib").Channel>}
   */
  async connect() {
    if (this.channel) {
      return this.channel;
    }

    if (this.isConnecting) {
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          if (!this.isConnecting) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });
      return this.channel;
    }

    try {
      this.isConnecting = true;

      logger.info("Connecting to RabbitMQ...");

      this.connection = await amqp.connect(config.rabbitmq.uri);
      this.channel = await this.connection.createChannel();

      const dlqName = `${config.rabbitmq.queue}.dlq`;

      // Dead Letter Queue
      await this.channel.assertQueue(dlqName, {
        durable: true,
      });

      // Main Queue
      await this.channel.assertQueue(config.rabbitmq.queue, {
        durable: true,
        arguments: {
          "x-dead-letter-exchange": "",
          "x-dead-letter-routing-key": dlqName,
        },
      });

      logger.info(`RabbitMQ connected. Queue: ${config.rabbitmq.queue}`);

      // Connection events
      this.connection.on("close", () => {
        logger.warn("RabbitMQ connection closed");
        this.channel = null;
        this.connection = null;

        // Auto reconnect
        setTimeout(() => {
          this.connect();
        }, 5000);
      });

      this.connection.on("error", (err) => {
        logger.error("RabbitMQ connection error", {
          error: err.message,
        });
        this.channel = null;
        this.connection = null;
      });

      this.isConnecting = false;
      return this.channel;
    } catch (error) {
      this.isConnecting = false;

      logger.error("RabbitMQ connection failed", {
        error: error.message,
      });

      throw error;
    }
  }

  /**
   * Get current channel
   * @returns {import("amqplib").Channel | null}
   */
  getChannel() {
    return this.channel;
  }

  /**
   * Get connection status
   * @returns {"connected" | "connecting" | "disconnected"}
   */
  getStatus() {
    if (this.isConnecting) return "connecting";
    if (this.channel) return "connected";
    return "disconnected";
  }

  /**
   * Close RabbitMQ connection
   * @returns {Promise<void>}
   */
  async close() {
    try {
      if (this.channel) {
        await this.channel.close();
        this.channel = null;
      }

      if (this.connection) {
        await this.connection.close();
        this.connection = null;
      }

      logger.info("RabbitMQ connection closed");
    } catch (error) {
      logger.error("Error closing RabbitMQ connection", {
        error: error.message,
      });
      throw error;
    }
  }
}

export default new RabbitMQConnection();
