import { Response, Request } from "express";
import prisma from "../utilities/db";

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const { projectId } = req.query;
        const allTasks = await prisma.task.findMany({
            where: {
                projectId: Number(projectId),
            },
            include: {
                author: true,
                assignee: true,
                comments: true,
                attachments: true,
                project: {
                    select: {
                        name: true
                    }
                }             
            }
        });

        const tasks = allTasks.map((task) => ({
            ...task,
            taskId: task.project.name.split(" ").length > 1 ?
            (task.project.name.split(" ").reduce((newVal, curVal) => newVal.charAt(0) + curVal.charAt(0), "")+"-"+task.id).toUpperCase() :
            (task.project.name.split(" ").reduce((newVal, curVal) => newVal + curVal, "")+"-"+task.id)
        }))

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
                authorUserId, 
                projectId, 
                assignedUserId
            }
        })

        res.status(201).json(newTask)
    } catch (error: any) {
        console.log(error.message)
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