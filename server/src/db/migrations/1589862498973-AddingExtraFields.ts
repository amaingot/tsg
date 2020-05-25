import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingExtraFields1589862498973 implements MigrationInterface {
  name = "AddingExtraFields1589862498973";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employee" DROP CONSTRAINT "FK_1b53a0b16d4c3c335d66969bcc3"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "employee" ALTER COLUMN "clientId" SET NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "job" DROP CONSTRAINT "FK_e00beba94f55e2e444ccd678c6a"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "job" DROP CONSTRAINT "FK_8f0950c8aefa7c5f3a5520189e3"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "job" ALTER COLUMN "clientId" SET NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "job" ALTER COLUMN "customerId" SET NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "customer" DROP CONSTRAINT "FK_a0ed28b21025ecf97f22acc0617"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ALTER COLUMN "clientId" SET NOT NULL`,
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
    await queryRunner.query(
      `ALTER TABLE "customer" ALTER COLUMN "clientId" DROP NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD CONSTRAINT "FK_a0ed28b21025ecf97f22acc0617" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "job" ALTER COLUMN "customerId" DROP NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "job" ALTER COLUMN "clientId" DROP NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "job" ADD CONSTRAINT "FK_8f0950c8aefa7c5f3a5520189e3" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "job" ADD CONSTRAINT "FK_e00beba94f55e2e444ccd678c6a" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "employee" ALTER COLUMN "clientId" DROP NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "employee" ADD CONSTRAINT "FK_1b53a0b16d4c3c335d66969bcc3" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
  }
}
