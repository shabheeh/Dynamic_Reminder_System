import { CreateTaskDto, UpdateTaskDto } from "@/types/task.types";
import { BaseRepository } from "./base.repository";
import { ITaskRepository } from "./interfaces/task.repository.interface";
import { prisma } from "@/configs/database";
import { Prisma, Task } from "@prisma/client";
import { PaginatedResult, PaginationOptions } from "@/types/pagination.types";

export class TaskRepository
  extends BaseRepository<Task, CreateTaskDto, UpdateTaskDto>
  implements ITaskRepository
{
  protected model = prisma.task;

  async findByCondition(
    condition: Prisma.TaskWhereInput,
    options: PaginationOptions = {}
  ): Promise<PaginatedResult<Task>> {
    const page = Math.max(options.page || 1, 1);
    const limit = Math.min(Math.max(options.limit || 10, 1), 100);
    const skip = (page - 1) * limit;

    const [data, totalItems] = await Promise.all([
      this.model.findMany({
        where: condition,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.model.count({
        where: condition,
      })
    ]);

    const totalPages = Math.ceil(totalItems / limit);
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;

    return {
      data,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
        hasNext,
        hasPrevious,
      },
    };
  }
}
