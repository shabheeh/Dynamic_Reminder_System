import { injectable } from "inversify";
import { BaseRepository } from "./base.repository";
import { ReminderRule } from "@prisma/client";
import {
  CreateReminderRuleDto,
  UpdateReminderRuleDto,
} from "@/types/reminder-rule.types";
import { IReminderRuleRepository } from "./interfaces/reminder-rule.repository.interface";
import { prisma } from "@/configs/database";
import { PaginatedResult, PaginationOptions } from "@/types/pagination.types";

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

  async findActive(
    options: PaginationOptions
  ): Promise<PaginatedResult<ReminderRule>> {
    const page = Math.max(options.page || 1, 1);
    const limit = Math.min(Math.max(options.limit || 10, 1), 100);
    const skip = (page - 1) * limit;

    const [data, totalItems] = await Promise.all([
      this.model.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      this.model.count({
        where: { isActive: true },
      }),
    ]);

    const totalPages = Math.ceil(totalItems / limit);
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;

    return {
      data,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
        hasNext,
        hasPrevious,
      },
    };
  }

  async updateStatus(id: string, isActive: boolean): Promise<ReminderRule> {
    return await this.model.update({
      where: { id },
      data: { isActive },
    });
  }
}
