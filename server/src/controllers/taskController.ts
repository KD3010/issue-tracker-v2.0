import { Response, Request } from "express";
import prisma from "../utilities/db";

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const { projectId } = req.query;
        const tasks = await prisma.task.findMany({
            where: {
                projectId: Number(projectId),
            },
            include: {
                author: true,
                assignee: true,
                comments: true,
                attachments: true,                
            }
        });

        res.status(200).json(tasks)
    } catch (error: any) {
        res.status(500).json({
            message: `Error retreiving the tasks: \n ${error.message}`
        })
    }
}

export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { 
            title, 
            description, 
            status, 
            priority, 
            tags, 
            startDate, 
            dueDate, 
            points, 
            authorUserId, 
            projectId, 
            assignedUserId 
        } = req.body;

        const newTask = await prisma.task.create({
            data: {
                title, 
                description, 
                status, 
                priority, 
                tags, 
                startDate, 
                dueDate, 
                points, 
                authorUserId: authorUserId, 
                projectId, 
                assignedUserId: assignedUserId
            }
        })

        res.status(201).json(newTask)
    } catch (error: any) {
        res.status(500).json({
            message: `Error creating the task: \n ${error.message}`
        })
    }
}

export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;

        const updatedTask = await prisma.task.update({
            where: {
                id: Number(taskId),
            },
            data: {
                status: status,
            }
        });

        res.status(200).json(updatedTask)
    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            message: `Error updating the task: \n ${error.message}`
        })
    }
}