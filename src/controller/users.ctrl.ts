import { Model } from "@/database/models/model";
import { NextFunction, Request, Response } from "express";

export default class UsersController {
    private model: Model;

    constructor(model: Model) {
        this.model = model;
        this.getUsers = this.getUsers.bind(this);
    }

    public async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const results = await this.model.selectOne(["id AS user_id", "username AS name", "created_at"]);
            res.json(results);
        } catch (err: unknown) {
            next(err);
        }
    }
}
