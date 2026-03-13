import express from "express";
import type { NextFunction, Request, Response } from "express";
import taskRoutes from "./routes/task.route.js";

const app = express();

app.use(express.json());
app.use("/tasks", taskRoutes);

app.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
    void next;
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
});

export default app;
