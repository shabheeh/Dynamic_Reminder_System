import { ConditionType, Priority, PrismaClient, TaskStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.task.deleteMany();
  await prisma.reminderRule.deleteMany();

  await Promise.all([
    prisma.task.create({
      data: {
        title: "Client feedback follow-up",
        description:
          "Send follow-up email to client regarding latest deliverables",
        priority: Priority.MEDIUM,
        status: TaskStatus.IN_PROGRESS,
      },
    }),
    prisma.task.create({
      data: {
        title: "Team meeting preparation",
        description: "Prepare agenda for weekly team meeting",
        priority: Priority.MEDIUM,
        status: TaskStatus.COMPLETED,
      },
    }),
    prisma.task.create({
      data: {
        title: "Prepare monthly performance report",
        description:
          "Compile data from multiple departments and submit the monthly report.",
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        priority: Priority.HIGH,
        status: TaskStatus.IN_PROGRESS,
      },
    }),
    prisma.task.create({
      data: {
        title: "Project status update",
        description:
          "Prepare a slide deck with current progress and blockers for leadership review.",
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        priority: Priority.HIGH,
        status: TaskStatus.PENDING,
      },
    }),
    prisma.task.create({
      data: {
        title: "Security audit",
        description: "Conduct quarterly security audit",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        priority: Priority.CRITICAL,
        status: TaskStatus.PENDING,
      },
    }),
  ]);

  await Promise.all([
    prisma.reminderRule.create({
      data: {
        name: 'Due Date Approaching',
        description: 'Remind when task due date is within 2 days',
        conditionType: ConditionType.DUE_DATE_APPROACHING,
        conditionValue: { daysBefore: 2 },
        reminderMessage: 'Task "{taskTitle}" is due on {dueDate}. Please complete it soon.',
        isActive: true,
      },
    }),
    prisma.reminderRule.create({
      data: {
        name: 'Overdue Tasks',
        description: 'Remind about overdue tasks',
        conditionType: ConditionType.OVERDUE,
        conditionValue: {},
        reminderMessage: 'URGENT: Task "{taskTitle}" is overdue!',
        isActive: true,
      },
    }),
    prisma.reminderRule.create({
      data: {
        name: 'High Priority Tasks',
        description: 'Daily reminder for high and critical priority tasks',
        conditionType: ConditionType.PRIORITY_BASED,
        conditionValue: { priorities: [Priority.HIGH, Priority.CRITICAL] },
        reminderMessage: 'High priority task "{taskTitle}" needs attention.',
        isActive: true,
      },
    }),
  ]);
}

main()
  .catch((error) => {
    console.error("failed to seed", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });