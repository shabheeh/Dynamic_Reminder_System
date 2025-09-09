import { ReminderRule, ConditionType } from '@prisma/client';

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

export type ReminderRuleResponse = ReminderRule;
