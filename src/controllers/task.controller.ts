import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "./base/base.controller";
import { TYPES } from "@/types/inversify.types";
import { ITaskService } from "@/services/interfaces/task.service.interface";
import { ITaskController } from "./interfaces/task.controller.interface";

@injectable()
export class TaskController extends BaseController implements ITaskController {
  constructor(@inject(TYPES.TaskService) private taskService: ITaskService) {
    super();
  }

  createTask = async (req: Request, res: Response): Promise<void> => {
    const task = await this.taskService.createTask(req.body);
    this.handleSuccess(res, task, "Task created successfully", 201);
  };

  getTaskById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const task = await this.taskService.getTaskById(id);
    this.handleSuccess(res, task);
  };

  getAllTasks = async (req: Request, res: Response): Promise<void> => {
    const { page, limit } = req.query;

    const pageNumber = page ? parseInt(page as string, 10) : 1;
    const limitNumber = limit ? parseInt(limit as string, 10) : 100;
    const result = await this.taskService.getAllTasks({
      page: pageNumber,
      limit: limitNumber,
    });
    this.handleSuccess(res, result);
  };

  updateTask = async (req: Request, res: Response): Promise<void> => {
    const task = await this.taskService.updateTask(req.params.id, req.body);
    this.handleSuccess(res, task, "Task updated successfully");
  };

  deleteTask = async (req: Request, res: Response): Promise<void> => {
    await this.taskService.deleteTask(req.params.id);
    this.handleSuccess(res, null, "Task deleted Successfully");
  };
}
