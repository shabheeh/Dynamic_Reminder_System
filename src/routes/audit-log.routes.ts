import { container } from "@/configs/inversify.config";
import { IAuditLogController } from "@/controllers/interfaces/audit-log.controller.interface";
import { TYPES } from "@/types/inversify.types";
import { Router } from "express";

const router = Router();

const auditLOgController = container.get<IAuditLogController>(
  TYPES.AuditLogController
);

router.get("/reminder-rules", auditLOgController.getReminderRulesLogs);
router.get(
  "/reminder-executions",
  auditLOgController.getReminderExecutionsLogs
);

export { router as auditLogRouter };
