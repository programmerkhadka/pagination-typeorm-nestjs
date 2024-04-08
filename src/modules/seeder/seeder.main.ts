import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { SeederMainModule } from './seeder.main.module';
import { SeederAction } from './seeder.action';

async function bootstrap() {
  NestFactory.createApplicationContext(SeederMainModule)
    .then((appContext) => {
      const logger = appContext.get(Logger);
      const seeder = appContext.get(SeederAction);

      seeder
        .seed()
        .then(() => {
          logger.debug('Seeding complete!');
        })
        .catch((error) => {
          logger.error('Seeding failed!');
          throw error;
        })
        .finally(() => appContext.close());
    })
    .catch((error) => {
      throw error;
    });
}
bootstrap();
