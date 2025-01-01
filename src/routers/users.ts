import { Router } from "express";
import { Database } from "@/database/db";
import { Model } from "@/database/models/model";
const authRouter = Router();


const pool = Database.getPoolInstance();
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
