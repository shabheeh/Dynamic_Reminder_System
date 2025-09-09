import { container } from "@/configs/inversify.config";
import { IReminderRuleController } from "@/controllers/interfaces/reminder-rule.controller.interface";
import { TYPES } from "@/types/inversify.types";
import { Router } from "express";

const router = Router();

const reminderRuleController = container.get<IReminderRuleController>(
  TYPES.ReminderRuleController
);

router.post("/", reminderRuleController.createRule);
router.get("/", reminderRuleController.getAllRules);
router.get("/:id", reminderRuleController.getRuleById);
router.put("/:id", reminderRuleController.updateRule);
router.delete("/:id", reminderRuleController.deleteRule);
router.patch("/:id", reminderRuleController.toggleRuleStatus);

export { router as reminderRuleRoutes };
