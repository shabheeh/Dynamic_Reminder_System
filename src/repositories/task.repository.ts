import { CreateTaskDto, UpdateTaskDto } from "@/types/task.types";
import { BaseRepository } from "./base.repository";
import { ITaskRepository } from "./interfaces/task.repository.interface";
import { prisma } from "@/configs/database";
import { Prisma, Task } from "@prisma/client";

export class TaskRepository extends BaseRepository<Task, CreateTaskDto, UpdateTaskDto> implements ITaskRepository {
    protected model = prisma.task;

    async findByCondition(condition: Prisma.TaskWhereInput): Promise<Task[]> {
        return await this.model.findMany({
            where: condition,
        })
    }
}