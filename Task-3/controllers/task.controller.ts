import type { Request, Response } from "express";
import { tasks, incrementId } from "../models/Task.js";
import {
    createTaskSchema,
    updateTaskSchema,
} from "../validations/task.validation.js";
import type { CreateTaskInput } from "../validations/task.validation.js";

const checkId = (req: Request, res: Response) => {
    const { id: idParam } = req.params;

    if (typeof idParam !== "string") {
        res.status(400).json({ error: "Invalid ID format" });
        return null;
    }

    const id = Number(idParam);

    if (Number.isNaN(id)) {
        res.status(400).json({ error: "Invalid ID format" });
        return null;
    }

    return id;
};

export const createTask = (
    req: Request<{}, {}, CreateTaskInput>,
    res: Response,
) => {
    const result = createTaskSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            error: "Validation failed",
            details: result.error.issues,
        });
    }
    const { title, status, description } = result.data;
    const newTask = {
        id: incrementId(),
        title,
        status,
        description: description || "",
    };

    tasks.push(newTask);
    return res.status(201).json(newTask);
};

export const getTasks = (_req: Request, res: Response) => {
    return res.status(200).json(tasks);
};

export const getTaskById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    const task = tasks.find((t) => t.id === id);

    if (!task?.id) {
        return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json(task);
};

export const updateTask = (req: Request, res: Response) => {
    const id = checkId(req, res);
    if (id === null) return;

    const task = tasks.find((t) => t.id === id);
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    const parsed = updateTaskSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            error: "Validation failed",
            details: parsed.error.issues,
        });
    }

    const body = parsed.data;

    task.title = body.title || task.title;
    task.status = body.status || task.status;
    if (body.description !== undefined) task.description = body.description;

    return res.status(200).json(task);
};

export const deleteTask = (req: Request, res: Response) => {
    const id = checkId(req, res);
    if (id === null) return;

    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    tasks.splice(taskIndex, 1);
    return res.status(204).send();
};
