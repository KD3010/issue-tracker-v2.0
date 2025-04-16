import { Request, Response } from "express";
import prisma from "../utilities/db";
import { asyncHandler } from "../utilities/asyncHandler";

export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
    const { workspace } = req.query;
    try {
        const projects = await prisma.project.findMany({
            where: {
                workspaceId: Number(workspace)
            }
        });

        res.status(200).json(projects);
    } catch (error: any) {
        res.status(500).json({
            message: `Error retreiving the projects \n ${error.message}`
        });
    }
}

export const getProjectDetails = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            ProjectMembers: {
                include: {
                    member: true
                }
            },
            teams: true
        }
    })

    res.status(200).json(project)
})

export const createProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, version, workspaceId } = req.body;
        const newProject = await prisma.project.create({
            data: {
                name,
                description,
                version,
                workspaceId
            }
        })

        res.status(201).json(newProject)
    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            message: `Error creating the project \n ${error.message}`
        })
    }
}