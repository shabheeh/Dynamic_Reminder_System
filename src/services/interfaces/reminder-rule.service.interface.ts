import { PaginatedResult, PaginationOptions } from "@/types/pagination.types";
import { CreateReminderRuleDto, ReminderRuleResponse, UpdateReminderRuleDto } from "@/types/reminder-rule.types";

export interface IReminderRuleService {
  createRule(data: CreateReminderRuleDto): Promise<ReminderRuleResponse>;
  getRuleById(id: string): Promise<ReminderRuleResponse>;
  getAllRules(options: PaginationOptions): Promise<PaginatedResult<ReminderRuleResponse>>;
  getActiveRules(options: PaginationOptions): Promise<PaginatedResult<ReminderRuleResponse>>;
  updateRule(id: string, data: UpdateReminderRuleDto): Promise<ReminderRuleResponse>;
  deleteRule(id: string): Promise<void>;
  toggleRuleStatus(id: string, isActive: boolean): Promise<ReminderRuleResponse>;
}
