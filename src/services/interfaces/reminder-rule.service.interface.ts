import { CreateReminderRuleDto, UpdateReminderRuleDto } from "@/types/reminder-rule.types";
import { ReminderRule } from "@prisma/client";

export interface IReminderRuleService {
  createRule(data: CreateReminderRuleDto): Promise<ReminderRule>;
  getRuleById(id: string): Promise<ReminderRule>;
  getAllRules(): Promise<ReminderRule[]>;
  getActiveRules(): Promise<ReminderRule[]>;
  updateRule(id: string, data: UpdateReminderRuleDto): Promise<ReminderRule>;
  deleteRule(id: string): Promise<void>;
  toggleRuleStatus(id: string, isActive: boolean): Promise<ReminderRule>;
}
