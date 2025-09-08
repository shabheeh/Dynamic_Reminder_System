import { Request, Response } from "express";

export interface ITaskController {
  createTask(req: Request, res: Response): Promise<void>;
  getTaskById(req: Request, res: Response): Promise<void>;
  getAllTasks(req: Request, res: Response): Promise<void>;
  updateTask(req: Request, res: Response): Promise<void>;
  deleteTask(req: Request, res: Response): Promise<void>;
}
