import { ZodSchema } from "zod";
import { NextFunction, Request, Response } from "express";

export function bodyValidatorMiddleware(schema: ZodSchema) {
    return async function(req: Request, res: Response, next: NextFunction) {
        const result = schema.safeParse(req.body);

        if(result.success){
            req.body = result.data;
            return next();
        }

        return res.status(400).json({
            message: "Invalid Request Body",
            errors: result.error.format(),
        });
    }
}
