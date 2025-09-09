import { inject, injectable } from "inversify";
import { IAuditLogController } from "./interfaces/audit-log.controller.interface";
import { TYPES } from "@/types/inversify.types";
import { IAuditLogService } from "@/services/interfaces/audit-log.service.interface";
import { Request, Response } from "express";
import { BaseController } from "./base/base.controller";

@injectable()
export class AuditLogController
  extends BaseController
  implements IAuditLogController
{
  constructor(
    @inject(TYPES.AuditLogService) private auditLogService: IAuditLogService
  ) {
    super();
  }

  getReminderRulesLogs = async (req: Request, res: Response): Promise<void> => {
    const auditLogs = await this.auditLogService.findReminderRules();
    this.handleSuccess(res, { auditLogs, count: auditLogs.length });
  };

  getReminderExecutionsLogs = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const auditLogs = await this.auditLogService.findReminderExecutions();
    this.handleSuccess(res, { auditLogs, count: auditLogs.length });
  };
}
