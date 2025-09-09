import { inject, injectable } from "inversify";
import { IReminderRuleService } from "./interfaces/reminder-rule.service.interface";
import { TYPES } from "@/types/inversify.types";
import { IReminderRuleRepository } from "@/repositories/interfaces/reminder-rule.repository.interface";
import {
  CreateReminderRuleDto,
  UpdateReminderRuleDto,
} from "@/types/reminder-rule.types";
import { ReminderRule } from "@prisma/client";
import logger from "@/configs/logger";
import { AppError } from "@/utils/error";

@injectable()
export class ReminderRuleService implements IReminderRuleService {
  constructor(
    @inject(TYPES.ReminderRuleRepository)
    private reminderRuleRepository: IReminderRuleRepository
  ) {}

  async createRule(data: CreateReminderRuleDto): Promise<ReminderRule> {
    try {
      const rule = await this.reminderRuleRepository.create(data);
      logger.info(`Reminder rule created successfully: ${rule.id}`);
      return rule;
    } catch (error) {
      logger.error("Error creating reminder rule:", error);
      throw error;
    }
  }

  async getRuleById(id: string): Promise<ReminderRule> {
    try {
      const rule = await this.reminderRuleRepository.findById(id);
      if (!rule) {
        throw new AppError("Reminder rule is not found", 404);
      }
      return rule;
    } catch (error) {
      logger.error("Error getting reminder rule", error);
      throw error;
    }
  }

  async getAllRules(): Promise<ReminderRule[]> {
    try {
      const rules = await this.reminderRuleRepository.findAll();
      return rules;
    } catch (error) {
      logger.error("Error getting all reminder rules:", error);
      throw error;
    }
  }

  async getActiveRules(): Promise<ReminderRule[]> {
    try {
      const rules = await this.reminderRuleRepository.findActive();
      return rules;
    } catch (error) {
      logger.error("Error getting active reminder rules:", error);
      throw error;
    }
  }

  async updateRule(
    id: string,
    data: UpdateReminderRuleDto
  ): Promise<ReminderRule> {
    try {
      const updatedRule = await this.reminderRuleRepository.update(id, data);
      logger.info("Reminder rule updated successfully");
      return updatedRule;
    } catch (error) {
      logger.error("Error updating reminder rule", error);
      throw error;
    }
  }

  async deleteRule(id: string): Promise<void> {
    try {
      const deletedRule = await this.reminderRuleRepository.delete(id);
      if (!deletedRule) {
        throw new AppError("Failed to delete reminder rule");
      }
      logger.info("Reminder rule deleted successfully");
    } catch (error) {
      logger.error("Error deleting reminder rule", error);
      throw error;
    }
  }

  async toggleRuleStatus(id: string, isActive: boolean): Promise<ReminderRule> {
    try {
      const rule = await this.reminderRuleRepository.updateStatus(id, isActive);
      if (rule) {
        logger.info(
          `Reminder rule ${id} ${
            rule.isActive ? "activated" : "deactivated"
          } successfully`
        );
      }
      return rule;
    } catch (error) {
      logger.error("Error toggling reminder rule status", error);
      throw error;
    }
  }
}
