import { Request, Response } from "express";
import { asyncHandler } from "../utilities/asyncHandler";
import prisma from "../utilities/db";

export const getMyWorkspaces = asyncHandler(async (req: Request, res: Response) => {
    const { user } = req.query;
    const workspaces = await prisma.workspace.findMany({
        where: {
            users: {
                some: {
                    user: {
                        email: String(user)
                    }
                }
            }
        }, 
        include: {
            projects: true
        }
    })

    res.status(200).json(workspaces)
})