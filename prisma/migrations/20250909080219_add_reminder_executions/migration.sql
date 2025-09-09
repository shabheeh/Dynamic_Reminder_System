-- CreateTable
CREATE TABLE "public"."reminder_executions" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "reminderRuleId" TEXT NOT NULL,
    "executedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reminder_executions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reminder_executions_taskId_reminderRuleId_key" ON "public"."reminder_executions"("taskId", "reminderRuleId");

-- AddForeignKey
ALTER TABLE "public"."reminder_executions" ADD CONSTRAINT "reminder_executions_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "public"."tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reminder_executions" ADD CONSTRAINT "reminder_executions_reminderRuleId_fkey" FOREIGN KEY ("reminderRuleId") REFERENCES "public"."reminder_rules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
