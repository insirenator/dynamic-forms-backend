import appVars from "@/config/env";
import { ApiError } from "@/errors/api-error";
import logger from "@/utils/logger";
import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);
    if (err instanceof ApiError) {
        return res.status(err.status).json({
            name: err.name,
            message: err.message,
            status: err.status,
            stack: appVars.env === "development" ? err.stack : undefined,
        })
    }

    return res.status(500).json({
        name: err.name,
        message: err.message,
        stack: appVars.env === "development" ? err.stack : undefined,
    })
};
