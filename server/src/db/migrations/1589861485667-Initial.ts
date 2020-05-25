import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1589861485667 implements MigrationInterface {
  name = "Initial1589861485667";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "employee_userrole_enum" AS ENUM('SuperAdmin', 'AccountAdmin', 'Employee')`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "employee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "cellPhone" character varying, "userRole" "employee_userrole_enum" NOT NULL DEFAULT 'Employee', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "clientId" uuid, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "job" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "finished" boolean NOT NULL, "name" character varying, "stringName" character varying, "racket" character varying, "tension" character varying, "gauge" character varying, "recievedAt" TIMESTAMP, "finishedAt" TIMESTAMP, "finishedByEmployeeId" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "clientId" uuid, "customerId" uuid, CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "memNum" character varying, "firstName" character varying, "lastName" character varying, "middleInitial" character varying, "email" character varying, "address" character varying, "address2" character varying, "city" character varying, "zip" character varying, "homePhone" character varying, "workPhone" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "clientId" uuid, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "stripeCustomerId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "employee" ADD CONSTRAINT "FK_1b53a0b16d4c3c335d66969bcc3" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "job" ADD CONSTRAINT "FK_e00beba94f55e2e444ccd678c6a" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "job" ADD CONSTRAINT "FK_8f0950c8aefa7c5f3a5520189e3" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "job" ADD CONSTRAINT "FK_b94a9a45002168f2fabd872bbe6" FOREIGN KEY ("finishedByEmployeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD CONSTRAINT "FK_a0ed28b21025ecf97f22acc0617" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer" DROP CONSTRAINT "FK_a0ed28b21025ecf97f22acc0617"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "job" DROP CONSTRAINT "FK_b94a9a45002168f2fabd872bbe6"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "job" DROP CONSTRAINT "FK_8f0950c8aefa7c5f3a5520189e3"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "job" DROP CONSTRAINT "FK_e00beba94f55e2e444ccd678c6a"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "employee" DROP CONSTRAINT "FK_1b53a0b16d4c3c335d66969bcc3"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "client"`, undefined);
    await queryRunner.query(`DROP TABLE "customer"`, undefined);
    await queryRunner.query(`DROP TABLE "job"`, undefined);
    await queryRunner.query(`DROP TABLE "employee"`, undefined);
    await queryRunner.query(`DROP TYPE "employee_userrole_enum"`, undefined);
  }
}
