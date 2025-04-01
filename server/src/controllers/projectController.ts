import { Request, Response } from "express";
import prisma from "../utilities/db";

export const getAllProjects = async (_: Request, res: Response): Promise<void> => {
    try {
        const projects = await prisma.project.findMany();

        res.status(200).json({
            projects,
            total: projects.length
        });
    } catch (error: any) {
        res.status(500).json({
            message: `Error retreiving the projects \n ${error.message}`
        });
    }
}

export const createProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, startDate, endDate } = req.body;
        const project = await prisma.project.create({
            data: {
                name,
                description,
                startDate,
                endDate
            }
        })

        res.status(201).json({
            project
        })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            message: `Error creating the project \n ${error.message}`
        })
    }
}