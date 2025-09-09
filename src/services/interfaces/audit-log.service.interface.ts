import { AuditLogResponse } from "@/types/audit-log.types";

export interface IAuditLogService {
    findReminderRules(): Promise<AuditLogResponse[]>
    findReminderExecutions(): Promise<AuditLogResponse[]>
}