import { Pool, RowDataPacket } from "mysql2/promise";
import { Model } from "./model";

interface User extends RowDataPacket {
    id: number,
    username: string,
    email: string,
    password?: string,
    created_at?: string,
    updated_at?: string,
}

export class UsersModel extends Model<User> {
    constructor(pool: Pool){
        super("user", pool);
    }
}
