import { injectable } from "inversify";
import { IAuditLogRepository } from "./interfaces/audit-log.repository.interface";
import { prisma } from "@/configs/database";
import { CreateAuditLogDto } from "@/types/audit-log.types";
import { AuditLog, EntityType } from "@prisma/client";

@injectable()
export class AuditLogRepository implements IAuditLogRepository {
  private model = prisma.auditLog;

  async create(data: CreateAuditLogDto): Promise<AuditLog> {
    return await this.model.create({
      data,
    });
  }

  async findByEntity(entityType: EntityType,): Promise<AuditLog[]> {
    return await prisma.auditLog.findMany({
      where: {
        entityType,
      },
      include: {
        reminderRule: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
