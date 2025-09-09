import { config } from "@/configs/environment";
import logger from "@/configs/logger";
import { IReminderService } from "@/services/interfaces/reminder.service.interface";
import { TYPES } from "@/types/inversify.types";
import { inject, injectable } from "inversify";
import * as cron from "node-cron";
@injectable()
export class ReminderScheduler {
  private scheduledTasks: cron.ScheduledTask[] = [];

  constructor(
    @inject(TYPES.ReminderService) private reminderService: IReminderService
  ) {}

  start(): void {
    const minuteTask = cron.schedule(
      config.REMINDER_CRON,
      async () => {
        try {
          await this.reminderService.processReminders();
        } catch (error) {
          logger.error("Scheduler error:", error);
        }
      },
      {
        timezone: config.TIMEZONE,
      }
    );

    minuteTask.start();
    this.scheduledTasks = [minuteTask];

    logger.info("scheduled tasks are started");
  }

  public stop(): void {
    logger.info("Stopping all scheduled tasks.");

    this.scheduledTasks.forEach((task) => {
      if (task) {
        task.stop();
      }
    });

    this.scheduledTasks = [];
    logger.info("All scheduled tasks stopped");
  }
}
