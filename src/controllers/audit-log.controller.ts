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
    const { page, limit } = req.query;

    const pageNumber = page ? parseInt(page as string, 10) : 1;
    const limitNumber = limit ? parseInt(limit as string, 10) : 100;
    const result = await this.auditLogService.findReminderRules({page: pageNumber, limit: limitNumber});
    this.handleSuccess(res, result);
  };

  getReminderExecutionsLogs = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { page, limit } = req.query;

    const pageNumber = page ? parseInt(page as string, 10) : 1;
    const limitNumber = limit ? parseInt(limit as string, 10) : 100;
    const result = await this.auditLogService.findReminderExecutions({page: pageNumber, limit: limitNumber});
    this.handleSuccess(res, result);
  };
}
