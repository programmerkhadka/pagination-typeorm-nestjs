import { Module } from '@nestjs/common';

import { CategoryModule } from './modules/category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CategoryModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.FORWARD_POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER || 'postgres', // Default user postgress to access server
      password: process.env.POSTGRES_PASSWORD || 'password', // Password that is set in docker-compose
      database: process.env.POSTGRES_DB || 'postgres', // Default db at very beganing we are accessing. After conncetion established manualy create db and put here
      autoLoadEntities: true,
      synchronize: true, // For production make sure disable it
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
