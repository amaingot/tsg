import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCustomerCellPhone1590441033335 implements MigrationInterface {
    name = 'AddCustomerCellPhone1590441033335'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ADD "cellPhone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "cellPhone"`);
    }

}
