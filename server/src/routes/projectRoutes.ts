import { Router } from "express";
import { createProject, getAllProjects } from "../controllers/projectController";

const router = Router();

router
    .get("/", getAllProjects)
    .post("/", createProject)

export default router;