import { injectable } from "inversify";
import { IAuditLogRepository } from "./interfaces/audit-log.repository.interface";
import { prisma } from "@/configs/database";
import { CreateAuditLogDto } from "@/types/audit-log.types";
import { AuditLog, EntityType } from "@prisma/client";
import { PaginatedResult, PaginationOptions } from "@/types/pagination.types";

@injectable()
export class AuditLogRepository implements IAuditLogRepository {
  private model = prisma.auditLog;

  async create(data: CreateAuditLogDto): Promise<AuditLog> {
    return await this.model.create({
      data,
    });
  }

  async findByEntity(
    entityType: EntityType,
    options: PaginationOptions = {}
  ): Promise<PaginatedResult<AuditLog>> {
    const page = Math.max(options.page || 1, 1);
    const limit = Math.min(Math.max(options.limit || 10, 1), 100);
    const skip = (page - 1) * limit;

    const [data, totalItems] = await Promise.all([
      this.model.findMany({
        where: {
          entityType,
        },
        include: {
          reminderRule: true,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      this.model.count({
        where: { entityType },
      }),
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
