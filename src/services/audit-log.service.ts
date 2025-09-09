import { inject, injectable } from "inversify";
import { IAuditLogService } from "./interfaces/audit-log.service.interface";
import { TYPES } from "@/types/inversify.types";
import { AuditLogResponse } from "@/types/audit-log.types";
import { IAuditLogRepository } from "@/repositories/interfaces/audit-log.repository.interface";
import { EntityType } from "@prisma/client";
import { AppError } from "@/utils/error";
import logger from "@/configs/logger";
import { PaginatedResult, PaginationOptions } from "@/types/pagination.types";

@injectable()
export class AuditLogService implements IAuditLogService {

    constructor(
        @inject(TYPES.AuditLogRepository) private auditLogRepository: IAuditLogRepository
    ) {}

    async findReminderRules(options: PaginationOptions): Promise<PaginatedResult<AuditLogResponse>> {
        try {
            return await this.auditLogRepository.findByEntity(EntityType.REMINDER_RULE, options);
            

        } catch (error) {
            logger.error("Error getting Audit logs of reminder rules", error)
            throw error
        }
    }

    async findReminderExecutions(options: PaginationOptions): Promise<PaginatedResult<AuditLogResponse>> {
        try {
            return await this.auditLogRepository.findByEntity(EntityType.REMINDER_EXECUTION, options);
           
        } catch (error) {
            logger.error("Error getting Audit logs of reminder executions", error)
            throw error
        }
    }
}