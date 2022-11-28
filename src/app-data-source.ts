import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'express_typescript',
  entities: ['src/entity/*.{js,ts}'],
  migrations: ['src/migrations/*.{js,ts}'],
  logging: true,
  synchronize: true,
});