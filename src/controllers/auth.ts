import { AuthService } from "@/services/auth";
import { tryCatchWrapper } from "@/utils/try-catch-wrapper";
import { NextFunction, Request, Response } from "express";

export class AuthController {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
        this.getUsers = tryCatchWrapper(this.getUsers.bind(this));
    }

    public async getUsers(req: Request, res: Response, next: NextFunction) {
        const userData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        };

        const result = await this.authService.signUpUser(userData);

        res.status(200).json({ message: "sign up successful", result });
    }
}
