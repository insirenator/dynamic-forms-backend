// Register Module Aliases. This allows us to import stuff using '@'
import 'module-alias/register';

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

import express from "express";

import database from "@/database/db";
import appVars, { validateEnvironmentVariables } from '@/config/env';
import { errorMiddleware, notFoundMiddleware } from '@/middlewares';
import appRouter from '@/routers';

configureAndStartServer()
    .catch((err) => {
        console.error("Error while starting the server!");
        console.error(err)
    });

async function configureAndStartServer() {
    // Validate required environmental variables
    validateEnvironmentVariables();

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // test database connection
    database.testConnection()

    // Hook up the router
    app.use(appRouter);

    app.use("*", notFoundMiddleware);
    app.use(errorMiddleware);

    app.listen(appVars.port, appVars.host,
        () => console.log(`Server started at ${appVars.host}:${appVars.port}... PID: ${process.pid}`)
    );

    process.on("SIGINT", async () => {
        try {
            await database.getPool().end();
            console.log("Shutting down gracefully...");
            process.exit(0);
        } catch (error) {
            console.log("Error while shutting down gracefully");
            console.error(error);
            process.exit(1);
        }
    });
}
