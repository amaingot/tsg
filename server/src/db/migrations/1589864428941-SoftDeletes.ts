import { MigrationInterface, QueryRunner } from "typeorm";

export class SoftDeletes1589864428941 implements MigrationInterface {
  name = "SoftDeletes1589864428941";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employee" ADD "deletedDate" TIMESTAMP NOT NULL DEFAULT now()`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "job" ADD "deletedDate" TIMESTAMP`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "deletedDate" TIMESTAMP`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "client" ADD "deletedDate" TIMESTAMP`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "client" DROP COLUMN "deletedDate"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "customer" DROP COLUMN "deletedDate"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "job" DROP COLUMN "deletedDate"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "employee" DROP COLUMN "deletedDate"`,
      undefined
    );
  }
}
