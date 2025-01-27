import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { appConfig } from '@config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new ConfigService(appConfig)

  await app.listen(
    config.get<number>('appConfig.port'),
    config.get<string>("appConfig.host"),
    () => console.log(`Server ${config.get<number>('appConfig.port')}-port started...`)
  );
}
bootstrap();
