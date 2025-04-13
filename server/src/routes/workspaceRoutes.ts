import { Router } from "express";
import { getMyWorkspaces } from "../controllers/workspaceController";

const router = Router();

router
    .get("/", getMyWorkspaces)

export default router;