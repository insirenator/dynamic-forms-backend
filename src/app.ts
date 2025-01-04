import express from "express";

import { errorMiddleware, morganMiddleware, notFoundMiddleware } from '@/middlewares';
import appRouter from '@/routers';

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
    }

    private middlewares() {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(morganMiddleware);
    }

    private routes() {
        this.express.use(appRouter);
        this.express.use("*", notFoundMiddleware);
        this.express.use(errorMiddleware);
    }
}

export default new App().express;
