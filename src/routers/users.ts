import { Router } from "express";
import database from "@/database/db";
import { Model } from "@/database/models/model";
const authRouter = Router();

const pool = database.getPool();
const model = new Model("user", pool);
authRouter.get("/signup", async (req, res, next) => {
    try {
        const results = await model.selectOne(["id AS user_id", "username AS name", "created_at"]);
        res.json(results);
    } catch (err: unknown) {
        next(err);
    }
})

export default authRouter;
