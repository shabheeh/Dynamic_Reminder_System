import {
  ReminderRule,
  ConditionType,
  Priority,
  TaskStatus,
} from "@prisma/client";

export interface CreateReminderRuleDto {
  name: string;
  description?: string;
  conditionType: ConditionType;
  conditionValue: any;
  reminderMessage: string;
}

export interface UpdateReminderRuleDto extends Partial<CreateReminderRuleDto> {
  isActive?: boolean;
}

export interface conditionValue {
  daysBefore?: number;
  priorities?: Priority[];
  statuses?: TaskStatus[];
}

export type ReminderRuleResponse = ReminderRule;
