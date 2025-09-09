import { AuditLogController } from '@/controllers/audit-log.controller';
import { IAuditLogController } from '@/controllers/interfaces/audit-log.controller.interface';
import { IReminderRuleController } from '@/controllers/interfaces/reminder-rule.controller.interface';
import { ITaskController } from '@/controllers/interfaces/task.controller.interface';
import { ReminderRuleController } from '@/controllers/reminder-rule.controller';
import { TaskController } from '@/controllers/task.controller';
import { AuditLogRepository } from '@/repositories/audit-log.repository';
import { IAuditLogRepository } from '@/repositories/interfaces/audit-log.repository.interface';
import { IReminderRuleRepository } from '@/repositories/interfaces/reminder-rule.repository.interface';
import { ITaskRepository } from '@/repositories/interfaces/task.repository.interface';
import { ReminderRuleRepository } from '@/repositories/reminder-rule.repository';
import { TaskRepository } from '@/repositories/task.repository';
import { ReminderScheduler } from '@/schedulers/reminder.scheduler';
import { AuditLogService } from '@/services/audit-log.service';
import { IAuditLogService } from '@/services/interfaces/audit-log.service.interface';
import { IReminderRuleService } from '@/services/interfaces/reminder-rule.service.interface';
import { IReminderService } from '@/services/interfaces/reminder.service.interface';
import { ITaskService } from '@/services/interfaces/task.service.interface';
import { ReminderRuleService } from '@/services/reminder-rule.service';
import { ReminderService } from '@/services/reminder.service';
import { TaskService } from '@/services/task.service';
import { TYPES } from '@/types/inversify.types';
import { Container } from 'inversify';
import 'reflect-metadata';

const container = new Container()

container.bind<ITaskRepository>(TYPES.TaskRepository).to(TaskRepository);
container.bind<IReminderRuleRepository>(TYPES.ReminderRuleRepository).to(ReminderRuleRepository);
container.bind<IAuditLogRepository>(TYPES.AuditLogRepository).to(AuditLogRepository);

container.bind<ITaskService>(TYPES.TaskService).to(TaskService)
container.bind<IReminderRuleService>(TYPES.ReminderRuleService).to(ReminderRuleService);
container.bind<IReminderService>(TYPES.ReminderService).to(ReminderService);
container.bind<IAuditLogService>(TYPES.AuditLogService).to(AuditLogService);

container.bind<ITaskController>(TYPES.TaskController).to(TaskController);
container.bind<IReminderRuleController>(TYPES.ReminderRuleController).to(ReminderRuleController);
container.bind<IAuditLogController>(TYPES.AuditLogController).to(AuditLogController);

container.bind<ReminderScheduler>(TYPES.ReminderScheduler).to(ReminderScheduler);
export { container };
