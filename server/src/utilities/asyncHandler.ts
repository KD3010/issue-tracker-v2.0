import { Request, Response } from "express";

export function asyncHandler(fn: Function) {
    return async function(req: Request, res: Response) {
        try {
            await fn(req, res);
        } catch(error: any) {
            throw new Error(error.message)
        }
    }
}