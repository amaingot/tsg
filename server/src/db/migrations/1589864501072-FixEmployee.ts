import {MigrationInterface, QueryRunner} from "typeorm";

export class FixEmployee1589864501072 implements MigrationInterface {
    name = 'FixEmployee1589864501072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "deletedDate" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "deletedDate" DROP DEFAULT`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "deletedDate" SET DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "deletedDate" SET NOT NULL`, undefined);
    }

}
