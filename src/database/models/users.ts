import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Model } from "./model";
import database from "@/database/db";

export interface IUser {
    id: number,
    username: string,
    email: string,
    password: string,
    verified: number,
    created_at?: Date,
    updated_at?: Date,
}

export interface ISignUpTokenData {
    user_id: number,
    token: string,
    expiry: Date,
    created_at?: Date,
}

export class UsersModel extends Model<IUser> {
    constructor(pool: Pool) {
        super("users", pool);
    }

    public async getUserByEmail(email: string) {
        const [results] = await this.pool.query<(IUser & RowDataPacket)[]>({
            sql: 'SELECT id FROM ?? WHERE email = ? LIMIT 1',
            values: [this.tableName, email]
        });

        return results.length ? results[0] : null;
    }

    public async insertUser(user: Partial<IUser>, verified: boolean = false) {
        const conn = await this.pool.getConnection();

        await conn.beginTransaction();

        try {
            // If `verified` is `true`, add the user as already verified
            user.verified = verified ? 1 : 0;

            const [inserted] = await conn.query<ResultSetHeader>({
                sql: 'INSERT into ?? SET ?',
                values: [this.tableName, user]
            });

            // If `verified` is `true` not need to add signup token
            if (verified) {
                await conn.commit();
                return { id: inserted.insertId, ...user };
            }

            const signupTokenData: ISignUpTokenData = {
                user_id: inserted.insertId,
                token: "eju87sh76nh4r",
                expiry: new Date(Date.now() + (24 * 60 * 60 * 1000)),
            }

            await conn.query<ResultSetHeader>({
                sql: 'INSERT into signup_tokens SET ?',
                values: [signupTokenData],
            });

            await conn.commit();

            return {
                id: inserted.insertId,
                ...user,
                token: signupTokenData.token,
                expiry: signupTokenData.expiry,
            };

        } catch (error: unknown) {
            await conn.rollback();
            console.error(error);
            throw error;

        } finally {
            conn.release();
        }
    }
}

const pool = database.getPool();
export const usersModel = new UsersModel(pool)
