import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { BaseController } from "./base/base.controller";
import { IReminderRuleController } from "./interfaces/reminder-rule.controller.interface";
import { TYPES } from "@/types/inversify.types";
import { IReminderRuleService } from "@/services/interfaces/reminder-rule.service.interface";
import { AppError } from "@/utils/error";

@injectable()
export class ReminderRuleController
  extends BaseController
  implements IReminderRuleController
{
  constructor(
    @inject(TYPES.ReminderRuleService)
    private reminderRuleService: IReminderRuleService
  ) {
    super();
  }

  createRule = async (req: Request, res: Response): Promise<void> => {
    const rule = await this.reminderRuleService.createRule(req.body);
    this.handleSuccess(res, rule, "Reminder rule created successfully", 201);
  };

  getAllRules = async (req: Request, res: Response): Promise<void> => {
    const { active, page, limit } = req.query;

    const pageNumber = page ? parseInt(page as string, 10) : 1;
    const limitNumber = limit ? parseInt(limit as string, 10) : 100;

    let result;
    if (active === "true") {
      result = await this.reminderRuleService.getActiveRules({
        page: pageNumber,
        limit: limitNumber,
      });
    } else {
      result = await this.reminderRuleService.getAllRules({
        page: pageNumber,
        limit: limitNumber,
      });
    }

    this.handleSuccess(res, result);
  };

  getRuleById = async (req: Request, res: Response): Promise<void> => {
    const rule = await this.reminderRuleService.getRuleById(req.params.id);
    this.handleSuccess(res, rule);
  };

  updateRule = async (req: Request, res: Response): Promise<void> => {
    const rule = await this.reminderRuleService.updateRule(
      req.params.id,
      req.body
    );
    this.handleSuccess(res, rule, "Reminder rule updated successfully");
  };

  deleteRule = async (req: Request, res: Response): Promise<void> => {
    await this.reminderRuleService.deleteRule(req.params.id);
    this.handleSuccess(res, null, "Reminder rule deleted successfully");
  };

  toggleRuleStatus = async (req: Request, res: Response): Promise<void> => {
    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      throw new AppError("isActive must be a boolean value", 400);
    }
    const rule = await this.reminderRuleService.toggleRuleStatus(
      req.params.id,
      isActive
    );
    this.handleSuccess(
      res,
      rule,
      `Reminder rule ${
        rule.isActive ? "activated" : "deactivated"
      } successfully`
    );
  };
}
