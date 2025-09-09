import { Prisma, Task } from "@prisma/client";
import { IBaseRepository } from "./base.repository.interface";
import { CreateTaskDto, UpdateTaskDto } from "@/types/task.types";
import { PaginatedResult, PaginationOptions } from "@/types/pagination.types";

export interface ITaskRepository extends IBaseRepository<Task, CreateTaskDto, UpdateTaskDto> {
  findByCondition(condition: Prisma.TaskWhereInput, options: PaginationOptions): Promise<PaginatedResult<Task>>;
}