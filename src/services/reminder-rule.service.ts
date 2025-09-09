import { inject, injectable } from "inversify";
import { IReminderRuleService } from "./interfaces/reminder-rule.service.interface";
import { TYPES } from "@/types/inversify.types";
import { IReminderRuleRepository } from "@/repositories/interfaces/reminder-rule.repository.interface";
import {
  CreateReminderRuleDto,
  ReminderRuleResponse,
  UpdateReminderRuleDto,
} from "@/types/reminder-rule.types";
import { EntityType, ReminderRule } from "@prisma/client";
import logger from "@/configs/logger";
import { AppError } from "@/utils/error";
import { IAuditLogRepository } from "@/repositories/interfaces/audit-log.repository.interface";

@injectable()
export class ReminderRuleService implements IReminderRuleService {
  constructor(
    @inject(TYPES.ReminderRuleRepository)
    private reminderRuleRepository: IReminderRuleRepository,
    @inject(TYPES.AuditLogRepository)
    private auditLogRepository: IAuditLogRepository
  ) {}

  async createRule(data: CreateReminderRuleDto): Promise<ReminderRuleResponse> {
    try {
      const rule = await this.reminderRuleRepository.create(data);

      await this.auditLogRepository.create({
        entityType: "REMINDER_RULE",
        entityId: rule.id,
        action: "CREATED",
        details: {
          rule: {
            name: rule.name,
            conditionType: data.conditionType,
            conditionValue: data.conditionValue,
            reminderMessage: data.reminderMessage,
          },
        },
      });

      logger.info(`Reminder rule created successfully: ${rule.id}`);
      return rule;
    } catch (error) {
      logger.error("Error creating reminder rule:", error);
      throw error;
    }
  }

  async getRuleById(id: string): Promise<ReminderRuleResponse> {
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

  async getAllRules(): Promise<ReminderRuleResponse[]> {
    try {
      const rules = await this.reminderRuleRepository.findAll();
      return rules;
    } catch (error) {
      logger.error("Error getting all reminder rules:", error);
      throw error;
    }
  }

  async getActiveRules(): Promise<ReminderRuleResponse[]> {
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
  ): Promise<ReminderRuleResponse> {
    try {
      const existingRule = await this.getRuleById(id);
      const updatedRule = await this.reminderRuleRepository.update(id, data);

      await this.auditLogRepository.create({
        entityType: "REMINDER_RULE",
        entityId: updatedRule.id,
        action: "UPDATED",
        details: {
          previous: {
            name: existingRule.name,
            conditionType: existingRule.conditionType,
            conditionValue: existingRule.conditionValue,
            reminderMessage: existingRule.reminderMessage,
            isActive: existingRule.isActive,
          },
          updated: updatedRule,
        },
      });

      logger.info("Reminder rule updated successfully");
      return updatedRule;
    } catch (error) {
      logger.error("Error updating reminder rule", error);
      throw error;
    }
  }

  async deleteRule(id: string): Promise<void> {
    try {
      const existingRule = await this.getRuleById(id);
      const deletedRule = await this.reminderRuleRepository.delete(id);
      if (!deletedRule) {
        throw new AppError("Failed to delete reminder rule");
      }
      await this.auditLogRepository.create({
        entityType: "REMINDER_RULE",
        entityId: id,
        action: "DELETED",
        details: {
          deletedRule: {
            name: existingRule.name,
            conditionType: existingRule.conditionType,
            conditionValue: existingRule.conditionValue,
            reminderMessage: existingRule.reminderMessage,
            isActive: existingRule.isActive,
          },
        },
      });
      logger.info("Reminder rule deleted successfully");
    } catch (error) {
      logger.error("Error deleting reminder rule", error);
      throw error;
    }
  }

  async toggleRuleStatus(
    id: string,
    isActive: boolean
  ): Promise<ReminderRuleResponse> {
    try {
      const existingRule = await this.getRuleById(id);
      const rule = await this.reminderRuleRepository.updateStatus(id, isActive);

      logger.info(
        `Reminder rule ${id} ${
          rule.isActive ? "activated" : "deactivated"
        } successfully`
      );
      await this.auditLogRepository.create({
        entityType: "REMINDER_RULE",
        entityId: rule.id,
        action: isActive ? "ACTIVATED" : "DEACTIVATED",
        details: {
          previousStatus: existingRule.isActive,
          newStatus: isActive,
          ruleName: existingRule.name,
        },
      });

      return rule;
    } catch (error) {
      logger.error("Error toggling reminder rule status", error);
      throw error;
    }
  }
}
