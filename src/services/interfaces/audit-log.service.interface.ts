import { AuditLogResponse } from "@/types/audit-log.types";
import { PaginatedResult, PaginationOptions } from "@/types/pagination.types";

export interface IAuditLogService {
    findReminderRules(options: PaginationOptions): Promise<PaginatedResult<AuditLogResponse>>;
    findReminderExecutions(options: PaginationOptions): Promise<PaginatedResult<AuditLogResponse>>;
}