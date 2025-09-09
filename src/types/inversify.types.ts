export const TYPES = {
  TaskRepository: Symbol.for("TaskRepository"),
  ReminderRuleRepository: Symbol.for("ReminderRuleRepository"),

  TaskService: Symbol.for("TaskService"),
  ReminderRuleService: Symbol.for("ReminderRuleService"),
  ReminderService: Symbol.for("ReminderService"),

  TaskController: Symbol.for("TaskController"),
  ReminderRuleController: Symbol.for("ReminderRuleController"),

  ReminderScheduler: Symbol.for("ReminderScheduler"),
};
