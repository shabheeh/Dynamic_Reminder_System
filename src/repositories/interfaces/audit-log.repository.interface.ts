import { CreateAuditLogDto } from "@/types/audit-log.types";
import { AuditLog, EntityType } from "@prisma/client";

export interface IAuditLogRepository {
    create(data: CreateAuditLogDto): Promise<AuditLog>;
    findByEntity(entityType: EntityType): Promise<AuditLog[]>;
}