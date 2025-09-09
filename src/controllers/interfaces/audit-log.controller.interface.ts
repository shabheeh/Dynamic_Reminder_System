import { Request, Response } from "express";

export interface IAuditLogController {
  getReminderRulesLogs(req: Request, res: Response): Promise<void>;
  getReminderExecutionsLogs(req: Request, res: Response): Promise<void>;
}
