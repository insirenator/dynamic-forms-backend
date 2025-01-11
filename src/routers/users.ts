import { Router } from "express";
import { bodyValidatorMiddleware } from "@/middlewares";
import { UserSchema } from "@/schemas";
import { AuthController } from "@/controllers";
import { AuthService } from "@/services/auth";
import { usersModel } from "@/database/models";
import { hasher } from "@/utils/helpers";

const authService = new AuthService({ usersModel, hasher });
const authController = new AuthController(authService);

const authRouter = Router();

authRouter.post(
    "/signup",
    bodyValidatorMiddleware(UserSchema),
    authController.getUsers,
);

export default authRouter;
