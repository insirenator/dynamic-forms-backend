import mysql, { Pool, PoolOptions } from "mysql2/promise";
import appVars from "@/config/env";

export class Database {
    private pool: Pool;

    constructor(config: PoolOptions) {
        this.pool = mysql.createPool(config);
    }

    public getPool(){
        return this.pool;
    }

    public async testConnection() {
        // To check if the database connection can be made, make a connection and release immediately
        // Throws an error if connection fails
        const conn = await this.pool.getConnection();
        conn.release();
    }

}

export const dbPoolConfig: PoolOptions = {
    host: appVars.db.host,
    port: appVars.db.port,
    user: appVars.db.user,
    password: appVars.db.password,
    database: "dynamic_forms",
}
const database = new Database(dbPoolConfig)

export default database;
