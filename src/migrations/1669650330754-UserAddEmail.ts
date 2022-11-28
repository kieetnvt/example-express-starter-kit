import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UserAddEmail1669650330754 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `ALTER TABLE users
           ADD COLUMN email VARCHAR(100) NOT NULL`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'email');
    }

}
