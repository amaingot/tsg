import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1613367778224 implements MigrationInterface {
  name = "Initial1613367778224";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customer_detail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedDate" TIMESTAMP WITH TIME ZONE, "key" character varying NOT NULL, "value" character varying NOT NULL, "customerId" uuid NOT NULL, CONSTRAINT "PK_8813f335c0885c4e00993d0e7d4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "job_detail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedDate" TIMESTAMP WITH TIME ZONE, "key" character varying NOT NULL, "value" character varying NOT NULL, "jobId" uuid NOT NULL, CONSTRAINT "PK_790a9952312914517029a30a6ea" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "job_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedDate" TIMESTAMP WITH TIME ZONE, "snapshot" character varying NOT NULL, "jobId" uuid NOT NULL, "createdByEmployeeId" uuid, CONSTRAINT "PK_688f25ad49557eed88dbaaf5a96" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "job" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedDate" TIMESTAMP WITH TIME ZONE, "status" text NOT NULL DEFAULT 'PENDING', "type" text NOT NULL, "completedAt" TIMESTAMP WITH TIME ZONE, "accountId" uuid NOT NULL, "customerId" uuid NOT NULL, "completedByEmployeeId" uuid, CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "time_sheet_report" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedDate" TIMESTAMP WITH TIME ZONE, "status" text NOT NULL DEFAULT 'PENDING', "payPeriodStart" TIMESTAMP WITH TIME ZONE NOT NULL, "payPeriodEnd" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_94d1915e6857f3329f9cf366629" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "time_sheet_entry" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedDate" TIMESTAMP WITH TIME ZONE, "status" text NOT NULL DEFAULT 'PENDING', "clockedInAt" TIMESTAMP WITH TIME ZONE NOT NULL, "clockedOutAt" TIMESTAMP WITH TIME ZONE, "accountId" uuid NOT NULL, "employeeId" uuid NOT NULL, "reportId" uuid, CONSTRAINT "PK_ccd65957af2b8e19eec7f08c0d4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "employee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedDate" TIMESTAMP WITH TIME ZONE, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "cellPhone" character varying, "type" character varying NOT NULL, "accountId" uuid NOT NULL, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "customer_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedDate" TIMESTAMP WITH TIME ZONE, "snapshot" character varying NOT NULL, "customerId" uuid NOT NULL, "createdByEmployeeId" uuid, CONSTRAINT "PK_d79bb8dd2e9d589bf0c3cc0c7f2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "customer_relationship" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedDate" TIMESTAMP WITH TIME ZONE, "type" character varying NOT NULL, "customerId" uuid NOT NULL, "relatedCustomerId" uuid NOT NULL, CONSTRAINT "PK_14992378a605ca5fb6f78c56734" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedDate" TIMESTAMP WITH TIME ZONE, "firstName" character varying, "lastName" character varying, "companyName" character varying, "accountId" uuid NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "account_permission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedDate" TIMESTAMP WITH TIME ZONE, "type" character varying NOT NULL, "value" boolean NOT NULL, "accountId" uuid NOT NULL, CONSTRAINT "PK_202247292378cf3913a1edb41a0" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedDate" TIMESTAMP WITH TIME ZONE, "workspace" character varying NOT NULL, "name" character varying NOT NULL, "stripeCustomerId" character varying NOT NULL, "address" character varying NOT NULL, "addressSecondary" character varying NOT NULL, "businessPhone" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'ACTIVE', "type" character varying NOT NULL DEFAULT 'CUSTOMER', CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" integer NOT NULL, "deletedDate" TIMESTAMP WITH TIME ZONE, "email" character varying NOT NULL, "cellPhone" character varying, "type" character varying NOT NULL, "passwordHash" character varying NOT NULL, "passwordResetCode" integer, "passwordResetCodeExpiration" TIMESTAMP WITH TIME ZONE, "impersonatingEmployeeId" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "customer_detail" ADD CONSTRAINT "FK_2b6a3f72e2d4fbb2cfaf0c92fec" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job_detail" ADD CONSTRAINT "FK_2fbb7b393670b1ea88dd853bf32" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job_history" ADD CONSTRAINT "FK_87ef223d4ba488f368a1cc2bdde" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job_history" ADD CONSTRAINT "FK_27a44fa8ea107749150d7e3266d" FOREIGN KEY ("createdByEmployeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job" ADD CONSTRAINT "FK_ebaddc2a0b7c1aa23d6fc97b67b" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job" ADD CONSTRAINT "FK_8f0950c8aefa7c5f3a5520189e3" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job" ADD CONSTRAINT "FK_84cac29acede305d818bc552ca6" FOREIGN KEY ("completedByEmployeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "time_sheet_entry" ADD CONSTRAINT "FK_911bb32c82bbeb42af00030fcb5" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "time_sheet_entry" ADD CONSTRAINT "FK_836b7ebd5e2b44544c3e12aaa4f" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "time_sheet_entry" ADD CONSTRAINT "FK_bcc2dd4a5adddd86532c299162b" FOREIGN KEY ("reportId") REFERENCES "time_sheet_report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "employee" ADD CONSTRAINT "FK_0bac95278716cdb1057c9129fdc" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "customer_history" ADD CONSTRAINT "FK_1fc3ae2a80546dd05e94243b20b" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "customer_history" ADD CONSTRAINT "FK_fd2e7640582f469cdd18d934a49" FOREIGN KEY ("createdByEmployeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "customer_relationship" ADD CONSTRAINT "FK_da9400296f5b4b090df9d2a6d41" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "customer_relationship" ADD CONSTRAINT "FK_e4655419e4f7565a772ba55d1a6" FOREIGN KEY ("relatedCustomerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD CONSTRAINT "FK_c97c8c28cd65bdc7a3dcd26af5c" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "account_permission" ADD CONSTRAINT "FK_67c76018a72dcddb3320388a442" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account_permission" DROP CONSTRAINT "FK_67c76018a72dcddb3320388a442"`
    );
    await queryRunner.query(
      `ALTER TABLE "customer" DROP CONSTRAINT "FK_c97c8c28cd65bdc7a3dcd26af5c"`
    );
    await queryRunner.query(
      `ALTER TABLE "customer_relationship" DROP CONSTRAINT "FK_e4655419e4f7565a772ba55d1a6"`
    );
    await queryRunner.query(
      `ALTER TABLE "customer_relationship" DROP CONSTRAINT "FK_da9400296f5b4b090df9d2a6d41"`
    );
    await queryRunner.query(
      `ALTER TABLE "customer_history" DROP CONSTRAINT "FK_fd2e7640582f469cdd18d934a49"`
    );
    await queryRunner.query(
      `ALTER TABLE "customer_history" DROP CONSTRAINT "FK_1fc3ae2a80546dd05e94243b20b"`
    );
    await queryRunner.query(
      `ALTER TABLE "employee" DROP CONSTRAINT "FK_0bac95278716cdb1057c9129fdc"`
    );
    await queryRunner.query(
      `ALTER TABLE "time_sheet_entry" DROP CONSTRAINT "FK_bcc2dd4a5adddd86532c299162b"`
    );
    await queryRunner.query(
      `ALTER TABLE "time_sheet_entry" DROP CONSTRAINT "FK_836b7ebd5e2b44544c3e12aaa4f"`
    );
    await queryRunner.query(
      `ALTER TABLE "time_sheet_entry" DROP CONSTRAINT "FK_911bb32c82bbeb42af00030fcb5"`
    );
    await queryRunner.query(
      `ALTER TABLE "job" DROP CONSTRAINT "FK_84cac29acede305d818bc552ca6"`
    );
    await queryRunner.query(
      `ALTER TABLE "job" DROP CONSTRAINT "FK_8f0950c8aefa7c5f3a5520189e3"`
    );
    await queryRunner.query(
      `ALTER TABLE "job" DROP CONSTRAINT "FK_ebaddc2a0b7c1aa23d6fc97b67b"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_history" DROP CONSTRAINT "FK_27a44fa8ea107749150d7e3266d"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_history" DROP CONSTRAINT "FK_87ef223d4ba488f368a1cc2bdde"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_detail" DROP CONSTRAINT "FK_2fbb7b393670b1ea88dd853bf32"`
    );
    await queryRunner.query(
      `ALTER TABLE "customer_detail" DROP CONSTRAINT "FK_2b6a3f72e2d4fbb2cfaf0c92fec"`
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "account"`);
    await queryRunner.query(`DROP TABLE "account_permission"`);
    await queryRunner.query(`DROP TABLE "customer"`);
    await queryRunner.query(`DROP TABLE "customer_relationship"`);
    await queryRunner.query(`DROP TABLE "customer_history"`);
    await queryRunner.query(`DROP TABLE "employee"`);
    await queryRunner.query(`DROP TABLE "time_sheet_entry"`);
    await queryRunner.query(`DROP TABLE "time_sheet_report"`);
    await queryRunner.query(`DROP TABLE "job"`);
    await queryRunner.query(`DROP TABLE "job_history"`);
    await queryRunner.query(`DROP TABLE "job_detail"`);
    await queryRunner.query(`DROP TABLE "customer_detail"`);
  }
}
