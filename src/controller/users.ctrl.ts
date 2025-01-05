import { UsersModel } from "@/database/models";
import { tryCatchWrapper } from "@/utils/try-catch-wrapper";
import { NextFunction, Request, Response } from "express";

export default class UsersController {
    private model: UsersModel;

    constructor(model: UsersModel) {
        this.model = model;
        this.getUsers = tryCatchWrapper(this.getUsers.bind(this));
    }

    public async getUsers(req: Request, res: Response, next: NextFunction) {
        res.json(req.body);
    }
}
