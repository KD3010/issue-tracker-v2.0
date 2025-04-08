import { Request, Response } from "express";
import prisma from "../utilities/db";

export const getAllProjects = async (_: Request, res: Response): Promise<void> => {
    try {
        const projects = await prisma.project.findMany();

        res.status(200).json(projects);
    } catch (error: any) {
        res.status(500).json({
            message: `Error retreiving the projects \n ${error.message}`
        });
    }
}

export const getProjectDetails = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const project = await prisma.project.findUnique({
            where: {
                id: Number(id),
            }
        })

        res.status(200).json(project)
    } catch (error: any) {
        res.status(500).json({
            message: `Error retreiving the project details \n ${error.message}`
        });
    }
}

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