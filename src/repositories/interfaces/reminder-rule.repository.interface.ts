import { ReminderRule } from "@prisma/client";
import { IBaseRepository } from "./base.repository.interface";
import {
  CreateReminderRuleDto,
  UpdateReminderRuleDto,
} from "@/types/reminder-rule.types";

export interface IReminderRuleRepository
  extends IBaseRepository<
    ReminderRule,
    CreateReminderRuleDto,
    UpdateReminderRuleDto
  > {
  findActive(): Promise<ReminderRule[]>;
  updateStatus(id: string, isActive: boolean): Promise<ReminderRule>;
}
