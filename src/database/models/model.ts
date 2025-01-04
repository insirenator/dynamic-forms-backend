import { Pool, RowDataPacket } from "mysql2/promise";

export class Model<T extends RowDataPacket> {
    public tableName: string;
    protected pool: Pool;

    constructor(tableName: string, pool: Pool){
        this.tableName = tableName;
        this.pool = pool;
    }

    public async select(selectors: string[]){
        if(selectors.length === 0){
            throw new Error("provide at least one selector");
        }

        const query = `SELECT ${selectors.join()} FROM ${this.tableName}`;
        const [results] = await this.pool.query<T[]>(query);
        return results;
    }

    public async selectOne(selectors: string[]){
        if(selectors.length === 0){
            throw new Error("provide at least one selector");
        }

        const query = `SELECT ${selectors.join()} FROM ${this.tableName} LIMIT 1`;
        const [results] = await this.pool.query<T[]>(query);
        return results.length ? results[0] : null;
    }
}
