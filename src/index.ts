// Register Module Aliases. This allows us to import stuff using '@'
import 'module-alias/register';

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

import database from "@/database/db";
import appVars, { validateEnvironmentVariables } from '@/config/env';
import app from "@/app";

configureAndStartServer()
    .catch((err) => {
        console.error("Error while starting the server!");
        console.error(err);
    });

async function configureAndStartServer() {
    const onListening = function() {
        console.log(`Server started at ${appVars.host}:${appVars.port}`)
    }

    const onShutDown = async function() {
        try {
            await database.getPool().end();
            console.log("Shutting down gracefully...");
            process.exit(0);
        } catch (error) {
            console.log("Error while shutting down gracefully");
            console.error(error);
            process.exit(1);
        }
    }
    // Validate required environmental variables
    validateEnvironmentVariables();

    // test database connection
    await database.testConnection();
    console.log("Database connection successful")

    app.listen(appVars.port, appVars.host, onListening);

    process.on("SIGINT", onShutDown);
    process.on("SIGTERM", onShutDown);
}
