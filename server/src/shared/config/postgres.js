import pg from "pg"
import config from "./index.js"
import logger from "./logger.js"

const { Pool } = pg

/**
 * PostgreSQL Connection Manager (Singleton)
 */
class PostgresConnection {
    constructor() { 
        this.pool = null
    }

    /**
     * Get or create connection pool
     * @returns {import("pg").Pool}
     */
    getPool() {
        if (!this.pool) {
            this.pool = new Pool({
                host: config.postgres.host,
                port: config.postgres.port,
                database: config.postgres.database,
                user: config.postgres.user,
                password: config.postgres.password,
                max: 20,
                idleTimeoutMillis: 30000,
                connectionTimeoutMillis: 2000
            })

            this.pool.on("error", (err) => {
                logger.error("Unexpected error in idle PG client", {
                    error: err.message
                })
            })

            logger.info("PostgreSQL pool created")
        }

        return this.pool
    }

    /**
     * Test database connection
     * @returns {Promise<void>}
     */
    async testConnection() {
        try {
            const pool = this.getPool()
            const client = await pool.connect()

            const result = await client.query("SELECT NOW()")
            client.release()

            logger.info(`PG connected successfully at ${result.rows[0].now}`)
        } catch (error) {
            logger.error("PG connection test failed", {
                error: error.message
            })
            throw error
        }
    }

    /**
     * Execute SQL query
     * @param {string} text SQL query
     * @param {any[]} [params] Query parameters
     * @returns {Promise<import("pg").QueryResult>}
     */
    async query(text, params) {
        const pool = this.getPool()
        const start = Date.now()

        try {
            const result = await pool.query(text, params)
            const duration = Date.now() - start

            logger.debug("Executed query", {
                text,
                duration,
                rows: result.rowCount
            })

            return result
        } catch (error) {
            logger.error("Query error", {
                text,
                error: error.message
            })
            throw error
        }
    }

    /**
     * Close PostgreSQL pool
     * @returns {Promise<void>}
     */
    async close() {
        if (this.pool) {
            await this.pool.end()
            this.pool = null
            logger.info("PostgreSQL pool closed")
        }
    }
}

export default new PostgresConnection()