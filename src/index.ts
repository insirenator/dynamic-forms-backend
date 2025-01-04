// Register Module Aliases. This allows us to import stuff using '@'
import 'module-alias/register';

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

import database from "@/database/db";
import appVars, { validateEnvironmentVariables } from '@/config/env';
import app from "@/app";
import logger from '@/utils/logger';

configureAndStartServer()
    .catch((err) => {
        logger.error("Error while starting the server!");
        logger.error(err);
    });

async function configureAndStartServer() {
    const onListening = function() {
        logger.info(`Server started at ${appVars.host}:${appVars.port}`)
    }

    const onShutDown = async function() {
        try {
            await database.getPool().end();
            logger.info("Shutting down gracefully...");
            process.exit(0);
        } catch (error) {
            logger.info("Error while shutting down gracefully");
            logger.error(error);
            process.exit(1);
        }
    }
    // Validate required environmental variables
    validateEnvironmentVariables();

    // test database connection
    await database.testConnection();
    logger.info("Database connection successful")

    app.listen(appVars.port, appVars.host, onListening);

    process.on("SIGINT", onShutDown);
    process.on("SIGTERM", onShutDown);
}
