import { Pool } from "mysql2/promise";
import { Model } from "./model";

interface User {
    id: number,
    username: string,
    email: string,
    password: string,
    verified: number,
    created_at?: string,
    updated_at?: string,
}

export class UsersModel extends Model<User> {
    constructor(pool: Pool){
        super("users", pool);
    }
}
