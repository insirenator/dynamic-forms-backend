import { Router } from "express";
import { bodyValidatorMiddleware } from "@/middlewares";
import { UserSchema } from "@/schemas";
import { AuthController } from "@/controllers";
import { AuthService } from "@/services/auth";
import { usersModel } from "@/database/models";

const authService = new AuthService({ usersModel });
const authController = new AuthController(authService);

const authRouter = Router();

authRouter.post(
    "/signup",
    bodyValidatorMiddleware(UserSchema),
    authController.getUsers,
);

export default authRouter;
