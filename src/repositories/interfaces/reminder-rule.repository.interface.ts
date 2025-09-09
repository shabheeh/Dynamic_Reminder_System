import { ReminderRule } from "@prisma/client";
import { IBaseRepository } from "./base.repository.interface";
import {
  CreateReminderRuleDto,
  UpdateReminderRuleDto,
} from "@/types/reminder-rule.types";
import { PaginatedResult, PaginationOptions } from "@/types/pagination.types";

export interface IReminderRuleRepository
  extends IBaseRepository<
    ReminderRule,
    CreateReminderRuleDto,
    UpdateReminderRuleDto
  > {
  findActive(options: PaginationOptions): Promise<PaginatedResult<ReminderRule>>;
  updateStatus(id: string, isActive: boolean): Promise<ReminderRule>;
}
