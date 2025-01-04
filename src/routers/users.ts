import { Router } from "express";
import database from "@/database/db";
import UsersController from "@/controller/users.ctrl";
import { UsersModel } from "@/database/models";
const authRouter = Router();

const pool = database.getPool();
const model = new UsersModel(pool);

const usersController = new UsersController(model);

authRouter.get("/signup", usersController.getUsers);

export default authRouter;
