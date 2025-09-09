import { CreateTaskDto, TaskResponse, UpdateTaskDto } from "@/types/task.types";

export interface ITaskService {
  createTask(data: CreateTaskDto): Promise<TaskResponse>;
  getTaskById(id: string): Promise<TaskResponse>;
  getAllTasks(): Promise<TaskResponse[]>;
  updateTask(id: string, data: UpdateTaskDto): Promise<TaskResponse>;
  deleteTask(id: string): Promise<void>;
}