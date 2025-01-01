import { Router } from "express";
import database from "@/database/db";
import { Model } from "@/database/models/model";
import UsersController from "@/controller/users.ctrl";
const authRouter = Router();

const pool = database.getPool();
const model = new Model("user", pool);

const usersController = new UsersController(model);

authRouter.get("/signup", usersController.getUsers);

export default authRouter;
