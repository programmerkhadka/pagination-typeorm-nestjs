import { Module } from '@nestjs/common';

import { CategoryModule } from './modules/category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CategoryModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'password',
      database: 'headless-cms',
      autoLoadEntities: true,
      synchronize: true, // For production make sure disable it
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
