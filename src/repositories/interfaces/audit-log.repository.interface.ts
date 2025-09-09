import { CreateAuditLogDto } from "@/types/audit-log.types";
import { PaginatedResult, PaginationOptions } from "@/types/pagination.types";
import { AuditLog, EntityType } from "@prisma/client";

export interface IAuditLogRepository {
    create(data: CreateAuditLogDto): Promise<AuditLog>;
    findByEntity(entityType: EntityType, options: PaginationOptions): Promise<PaginatedResult<AuditLog>>;
}