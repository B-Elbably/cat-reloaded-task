type TaskStatus = 'pending' | 'in-progress' | 'done';

interface ITask {
    id: number;
    title: string;
    description?: string;
    status: TaskStatus;
}

export const tasks: ITask[] = [];
export let nextId = 1;

export const incrementId = () => nextId++;

export type { ITask, TaskStatus };