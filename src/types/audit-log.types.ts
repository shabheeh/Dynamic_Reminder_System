import { AuditLog, EntityType, AuditAction } from '@prisma/client';

export interface CreateAuditLogDto {
  entityType: EntityType;
  entityId?: string;
  action: AuditAction;
  details?: any;
  reminderRuleId?: string;
}

export type AuditLogResponse = AuditLog;
