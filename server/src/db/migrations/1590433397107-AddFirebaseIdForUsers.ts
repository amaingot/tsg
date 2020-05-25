import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFirebaseIdForUsers1590433397107 implements MigrationInterface {
    name = 'AddFirebaseIdForUsers1590433397107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "firebaseId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "firebaseId"`);
    }

}
