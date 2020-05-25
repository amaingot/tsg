import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveEmployeeName1590437075312 implements MigrationInterface {
  name = "RemoveEmployeeName1590437075312";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "name"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employee" ADD "name" character varying NOT NULL`
    );
  }
}
