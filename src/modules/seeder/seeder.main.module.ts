import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederHelperModule } from './seeder.helper.module';
import { SeederAction } from './seeder.action';

@Module({
  imports: [
    SeederHelperModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true, // For production make sure disable it
    }),
  ],
  providers: [Logger, SeederAction],
})
export class SeederMainModule {}
