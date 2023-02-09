import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRefreshTokenColumn1675924000016 implements MigrationInterface {
    name = 'AddRefreshTokenColumn1675924000016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "refresh_token" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refresh_token"`);
    }

}
