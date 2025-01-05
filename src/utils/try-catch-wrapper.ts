import { NextFunction, Request, Response } from "express";

export function tryCatchWrapper(fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
    return async function(req: Request, res: Response, next: NextFunction) {
        try {
            return await fn(req, res, next);
        } catch (err: unknown) {
            next(err);
        }
    }
}

