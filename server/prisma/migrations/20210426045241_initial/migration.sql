-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'PAYMENT_FAILED', 'CANCELED', 'PAUSED');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('CUSTOMER', 'DEMO', 'TRIAL');

-- CreateEnum
CREATE TYPE "AccountPermissionType" AS ENUM ('SMS_ENABLED', 'TIMESHEETS_ENABLED', 'RESERVATIONS_ENABLED');

-- CreateEnum
CREATE TYPE "CustomerDetailKey" AS ENUM ('EMAIL', 'CELL_PHONE', 'HOME_PHONE', 'WORK_PHONE', 'DATE_OF_BIRTH', 'ADDRESS', 'ADDRESS_SECONDARY', 'CITY', 'ZIP_CODE', 'STATE', 'MEMBER_NUMBER', 'MIDDLE_INITIAL');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('STRINGING_BASIC', 'STRINGING_HYBRID');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('PENDING', 'FINISHED');

-- CreateEnum
CREATE TYPE "JobDetailKey" AS ENUM ('RACKET_BRAND', 'RACKET_NAME', 'RACKET_SIZE', 'RACKET_SKU', 'STRINGS_BRAND', 'STRINGS_NAME', 'STRINGS_TENSION', 'STRINGS_SKU', 'MAIN_STRINGS_BRAND', 'MAIN_STRINGS_NAME', 'MAIN_STRINGS_TENSION', 'MAIN_STRINGS_SKU', 'CROSS_STRINGS_BRAND', 'CROSS_STRINGS_NAME', 'CROSS_STRINGS_TENSION', 'CROSS_STRINGS_SKU');

-- CreateEnum
CREATE TYPE "TimeSheetEntryStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'NEEDS_APPROVAL', 'PAID');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('SUPERADMIN', 'USER');

-- CreateTable
CREATE TABLE "Account" (
    "id" UUID NOT NULL,
    "workspace" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "AccountStatus" NOT NULL DEFAULT E'ACTIVE',
    "type" "AccountType" NOT NULL DEFAULT E'CUSTOMER',
    "businessPhone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "addressSecondary" TEXT NOT NULL,
    "stripeCustomerId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(6),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountPermission" (
    "id" UUID NOT NULL,
    "type" "AccountPermissionType" NOT NULL,
    "value" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(6),
    "accountId" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" UUID NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "companyName" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(6),
    "accountId" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerDetail" (
    "id" UUID NOT NULL,
    "key" "CustomerDetailKey" NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(6),
    "customerId" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerHistory" (
    "id" UUID NOT NULL,
    "snapshot" JSONB NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" UUID NOT NULL,
    "customerId" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cellPhone" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(6),
    "accountId" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" UUID NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT E'PENDING',
    "type" "JobType" NOT NULL,
    "completedAt" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(6),
    "accountId" UUID NOT NULL,
    "completedById" UUID,
    "customerId" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobDetail" (
    "id" UUID NOT NULL,
    "key" "JobDetailKey" NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(6),
    "jobId" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobHistory" (
    "id" UUID NOT NULL,
    "snapshot" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(6),
    "createdById" UUID,
    "jobId" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeSheetEntry" (
    "id" UUID NOT NULL,
    "status" "TimeSheetEntryStatus" NOT NULL DEFAULT E'IN_PROGRESS',
    "clockedInAt" TIMESTAMPTZ(6) NOT NULL,
    "clockedOutAt" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(6),
    "accountId" UUID NOT NULL,
    "employeeId" UUID NOT NULL,
    "reportId" UUID,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeSheetReport" (
    "id" UUID NOT NULL,
    "status" TEXT NOT NULL DEFAULT E'PENDING',
    "payPeriodStart" TIMESTAMPTZ(6) NOT NULL,
    "payPeriodEnd" TIMESTAMPTZ(6) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(6),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "cellPhone" TEXT,
    "type" "UserType" NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "passwordResetCode" INTEGER,
    "passwordResetCodeExpiration" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(6),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee.email_unique" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "AccountPermission" ADD FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerDetail" ADD FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerHistory" ADD FOREIGN KEY ("createdById") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerHistory" ADD FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD FOREIGN KEY ("completedById") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobDetail" ADD FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobHistory" ADD FOREIGN KEY ("createdById") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobHistory" ADD FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSheetEntry" ADD FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSheetEntry" ADD FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSheetEntry" ADD FOREIGN KEY ("reportId") REFERENCES "TimeSheetReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;
