import { Router } from "express";
import database from "@/database/db";
import UsersController from "@/controller/users.ctrl";
import { UsersModel } from "@/database/models";
import { bodyValidatorMiddleware } from "@/middlewares";
import { UserSchema } from "@/schemas";
const authRouter = Router();

const pool = database.getPool();
const model = new UsersModel(pool);

const usersController = new UsersController(model);

authRouter.get(
    "/signup",
    bodyValidatorMiddleware(UserSchema),
    usersController.getUsers,
);

export default authRouter;
