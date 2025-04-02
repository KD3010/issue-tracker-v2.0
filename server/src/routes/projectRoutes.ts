import { Router } from "express";
import { createProject, getAllProjects, getProjectDetails } from "../controllers/projectController";

const router = Router();

router
    .get("/", getAllProjects)
    .get("/:id", getProjectDetails)
    .post("/", createProject)

export default router;