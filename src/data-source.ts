import { DataSource } from 'typeorm';
import { Post } from './entities/post.entity';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_POST),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: true,
  synchronize: false,
  entities: [
    Post
  ],
  migrations: ['dist/migration/*.js'],
});

// マイグレーションファイル生成コマンド
// npx typeorm-ts-node-commonjs migration:generate src/migration/マイグレーションファイル名 -d src/data-source.ts

// マイグレーション実行コマンド
// npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts
