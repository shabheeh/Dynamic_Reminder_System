import { Task, Priority, TaskStatus } from '@prisma/client';

export interface CreateTaskDto {
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: Priority;
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {
  status?: TaskStatus;
}

export type TaskResponse = Task;
