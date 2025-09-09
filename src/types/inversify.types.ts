export const TYPES = {
  TaskRepository: Symbol.for("TaskRepository"),
  ReminderRuleRepository: Symbol.for("ReminderRuleRepository"),
  AuditLogRepository: Symbol.for("AuditLogRepository"),

  TaskService: Symbol.for("TaskService"),
  ReminderRuleService: Symbol.for("ReminderRuleService"),
  ReminderService: Symbol.for("ReminderService"),
  AuditLogService: Symbol.for("AuditLogService"),

  TaskController: Symbol.for("TaskController"),
  ReminderRuleController: Symbol.for("ReminderRuleController"),
  AuditLogController: Symbol.for("AuditLogController"),

  ReminderScheduler: Symbol.for("ReminderScheduler"),
};
