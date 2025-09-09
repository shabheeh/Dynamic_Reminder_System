import { injectable } from "inversify";
import { BaseRepository } from "./base.repository";
import { ReminderRule } from "@prisma/client";
import {
  CreateReminderRuleDto,
  UpdateReminderRuleDto,
} from "@/types/reminder-rule.types";
import { IReminderRuleRepository } from "./interfaces/reminder-rule.repository.interface";
import { prisma } from "@/configs/database";

@injectable()
export class ReminderRuleRepository
  extends BaseRepository<
    ReminderRule,
    CreateReminderRuleDto,
    UpdateReminderRuleDto
  >
  implements IReminderRuleRepository
{
  protected model = prisma.reminderRule;

  async findActive(): Promise<ReminderRule[]> {
    return await this.model.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async updateStatus(id: string, isActive: boolean): Promise<ReminderRule> {
    return await this.model.update({
      where: { id },
      data: { isActive },
    });
  }
}
