import { CreateTaskDto, UpdateTaskDto } from "@/types/task.types";
import { Task } from "@prisma/client";

export interface ITaskService {
  createTask(data: CreateTaskDto): Promise<Task>;
  getTaskById(id: string): Promise<Task>;
  getAllTasks(): Promise<Task[]>;
  updateTask(id: string, data: UpdateTaskDto): Promise<Task>;
  deleteTask(id: string): Promise<void>;
}