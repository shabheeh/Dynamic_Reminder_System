-- CreateEnum
CREATE TYPE "public"."Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "public"."TaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."ConditionType" AS ENUM ('DUE_DATE_APPROACHING', 'OVERDUE', 'PRIORITY_BASED', 'STATUS_BASED');

-- CreateEnum
CREATE TYPE "public"."EntityType" AS ENUM ('TASK', 'REMINDER_RULE', 'REMINDER_EXECUTION');

-- CreateEnum
CREATE TYPE "public"."AuditAction" AS ENUM ('CREATED', 'UPDATED', 'DELETED', 'ACTIVATED', 'DEACTIVATED', 'REMINDER_SENT');

-- CreateTable
CREATE TABLE "public"."tasks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" TIMESTAMP(3),
    "priority" "public"."Priority" NOT NULL DEFAULT 'MEDIUM',
    "status" "public"."TaskStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reminder_rules" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "conditionType" "public"."ConditionType" NOT NULL,
    "conditionValue" JSONB NOT NULL,
    "reminderMessage" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reminder_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."audit_logs" (
    "id" TEXT NOT NULL,
    "entityType" "public"."EntityType" NOT NULL,
    "entityId" TEXT,
    "action" "public"."AuditAction" NOT NULL,
    "details" JSONB,
    "reminderRuleId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."audit_logs" ADD CONSTRAINT "audit_logs_reminderRuleId_fkey" FOREIGN KEY ("reminderRuleId") REFERENCES "public"."reminder_rules"("id") ON DELETE SET NULL ON UPDATE CASCADE;
