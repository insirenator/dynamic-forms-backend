import { Router } from "express";
import { bodyValidatorMiddleware } from "@/middlewares";
import { UserSchema } from "@/schemas";
import { AuthController } from "@/controllers";
import { AuthService } from "@/services/auth";
import { usersModel } from "@/database/models";
import { hasher } from "@/utils/helpers";
import emailer from "@/lib/emailer"

const authService = new AuthService({ usersModel, hasher });
const authController = new AuthController(authService);

const authRouter = Router();

authRouter.post(
    "/signup",
    bodyValidatorMiddleware(UserSchema),
    authController.signupHandler,
);

authRouter.get(
    "/verify",
    async (req, res) => {
        const email = await emailer.getTemplate("signup");
        res.send(email);
    }
);

export default authRouter;
