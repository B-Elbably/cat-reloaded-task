import { Router } from "express";
import {
    createTask,
    getTaskById,
    getTasks,
    updateTask,
    deleteTask,
} from "../controllers/task.controller.js";

const router = Router();

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
