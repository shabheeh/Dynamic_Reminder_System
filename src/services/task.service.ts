import { inject, injectable } from "inversify";
import { ITaskService } from "./interfaces/task.service.interface";
import { TYPES } from "@/types/inversify.types";
import { ITaskRepository } from "@/repositories/interfaces/task.repository.interface";
import { CreateTaskDto, UpdateTaskDto } from "@/types/task.types";
import { Task } from "@prisma/client";
import logger from "@/configs/logger";
import { AppError } from "@/utils/error";

@injectable()
export class TaskService implements ITaskService {
  constructor(
    @inject(TYPES.TaskRepository) private taskRepository: ITaskRepository
  ) {}

  async createTask(data: CreateTaskDto): Promise<Task> {
    try {
      const task = await this.taskRepository.create(data);
      logger.info(`Task created: ${task.title}`);
      return task;
    } catch (error) {
      logger.error("Error creating task", error);
      throw error;
    }
  }

  async getTaskById(id: string): Promise<Task> {
    try {
      const task = await this.taskRepository.findById(id);
      if (!task) throw new AppError("Task creation failed", 500);
      return task;
    } catch (error) {
      logger.error("Error getting task", error);
      throw error;
    }
  }

  async getAllTasks(): Promise<Task[]> {
    try {
      return await this.taskRepository.findAll();
    } catch (error) {
      logger.error("Error getting all tasks:", error);
      throw error;
    }
  }

  async updateTask(id: string, data: UpdateTaskDto): Promise<Task> {
    try {
      const updatedTask = await this.taskRepository.update(id, data);
      logger.info(`Task updated: ${id}`);
      return updatedTask;
    } catch (error) {
      logger.error(`Error updating task ${id}:`, error);
      throw error;
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      const deletedTask = await this.taskRepository.delete(id);
      if (!deletedTask) {
        throw new AppError("Task failed to delete")
      }
      logger.info(`Task deleted: ${id}`);
    } catch (error) {
      logger.error(`Error deleting task ${id}:`, error);
      throw error;
    }
  }
}
