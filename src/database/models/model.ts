import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";

export class Model<M> {
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

        const query = `SELECT ${selectors.join()} FROM ??`;
        const [results] = await this.pool.query<(M & RowDataPacket)[]>({
            sql: query,
            values: [this.tableName],
        });
        return results;
    }

    public async selectOne(selectors: string[]){
        if(selectors.length === 0){
            throw new Error("provide at least one selector");
        }

        const query = `SELECT ${selectors.join()} FROM ?? LIMIT 1`;
        const [results] = await this.pool.query<(M & RowDataPacket)[]>({
            sql: query,
            values: [this.tableName],
        });
        return results.length ? results[0] : null;
    }

    public async insert(data: Partial<M>){
        const query = 'INSERT INTO ?? SET ?';
        const [result] = await this.pool.query<ResultSetHeader>({
            sql: query,
            values: [this.tableName, data],
        });

        return result;
    }

    public async update(data: Partial<M>, whereClause: string){
        const query = `UPDATE ?? SET ? ${whereClause}`;
        const [result] = await this.pool.query<ResultSetHeader>({
            sql: query,
            values: [this.tableName, data],
        });

        return result;
    }
}
