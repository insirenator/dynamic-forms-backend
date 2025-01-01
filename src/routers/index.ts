import { Router } from "express";

import authRouter from "./users";

const appRouter = Router();

appRouter.use('/auth', authRouter)

export default appRouter;
