import mysql, { Pool, PoolOptions } from "mysql2/promise";
import appVars from "@/config/env";

export class Database {
    private static pool: Pool | undefined;

    static initialize(config: PoolOptions) {
        if (this.pool) {
            console.info("Database is already initialized! Use Database.getPoolInstance() instead to get the pool instance directly.");
            return this.pool;
        }

        this.pool = mysql.createPool(config);
        return this.pool;
    }

    static getPoolInstance() {
        if (this.pool) return this.pool;
        throw new Error("Initialize the database first using Database.initialize(config) method!");
    }
}

export async function initializeDatabase() {
    const config: PoolOptions = {
        host: appVars.db.host,
        port: appVars.db.port,
        user: appVars.db.user,
        password: appVars.db.password,
        database: "dynamic_forms",
    }

    const pool = Database.initialize(config);
    
    // To check if the database connection can be made, make a connection and release immediately
    // Throws an error if connection fails
    const conn = await pool.getConnection();
    conn.release();

    console.log("Database initialized successfully!");
    
    pool.on("connection", () => {
        console.log("Pool connected!");
    });

    return pool;
}
