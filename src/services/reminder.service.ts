import { inject, injectable } from "inversify";
import { IReminderService } from "./interfaces/reminder.service.interface";
import { TYPES } from "@/types/inversify.types";
import { ITaskRepository } from "@/repositories/interfaces/task.repository.interface";
import { IReminderRuleRepository } from "@/repositories/interfaces/reminder-rule.repository.interface";
import { ConditionType, ReminderRule, Task, TaskStatus } from "@prisma/client";
import logger from "@/configs/logger";

@injectable()
export class ReminderService implements IReminderService {
  constructor(
    @inject(TYPES.TaskRepository) private taskRepository: ITaskRepository,
    @inject(TYPES.ReminderRuleRepository)
    private reminderRuleRepository: IReminderRuleRepository
  ) {}

  async processReminders(): Promise<void> {
    try {
      const activeRules = await this.reminderRuleRepository.findActive();
      const tasks = await this.taskRepository.findAll();

      for (const rule of activeRules) {
        const matchingTasks = this.evaluateRule(rule, tasks);

        for (const task of matchingTasks) {
          await this.sendReminder(rule, task);
        }
      }
    } catch (error) {
      logger.error("Error processing reminders:", error);
    }
  }

  private evaluateRule(rule: ReminderRule, tasks: Task[]): Task[] {
    return tasks.filter((task) => {
      switch (rule.conditionType) {
        case ConditionType.DUE_DATE_APPROACHING:
          return this.isDueDateApproaching(task, rule.conditionValue);
        case ConditionType.OVERDUE:
          return this.isOverdue(task);
        case ConditionType.PRIORITY_BASED:
          return this.matchesPriority(task, rule.conditionValue);
        case ConditionType.STATUS_BASED:
          return this.matchesStatus(task, rule.conditionValue);
        default:
          return false;
      }
    });
  }

  private isDueDateApproaching(task: Task, condition: any): boolean {
    if (!task.dueDate) return false;

    const daysBefore = condition.daysBefore || 1;
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays <= daysBefore && diffDays >= 0;
  }

  private isOverdue(task: Task): boolean {
    if (!task.dueDate) return false;

    const dueDate = new Date(task.dueDate);
    const today = new Date();

    return today > dueDate && task.status !== TaskStatus.COMPLETED;
  }

  private matchesPriority(task: Task, condition: any): boolean {
    const targetPriorities = condition.priorities || [];
    return targetPriorities.includes(task.priority);
  }

  private matchesStatus(task: Task, condition: any): boolean {
    const targetStatuses = condition.statuses || [];
    return targetStatuses.includes(task.status);
  }

  private async sendReminder(rule: any, task: any): Promise<void> {
    const reminderMessage = this.formatReminderMessage(
      rule.reminderMessage,
      task
    );

    console.log("=== REMINDER SENT ===");
    console.log(`Rule: ${rule.name}`);
    console.log(`Task: ${task.title}`);
    console.log(`Message: ${reminderMessage}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log("====================");

    logger.info(`Reminder sent for task ${task.id} using rule ${rule.id}`);
  }

  private formatReminderMessage(template: string, task: Task): string {
    return template
      .replace("{taskTitle}", task.title)
      .replace(
        "{dueDate}",
        task.dueDate
          ? new Date(task.dueDate).toLocaleDateString()
          : "No due date"
      )
      .replace("{priority}", task.priority);
  }
}
