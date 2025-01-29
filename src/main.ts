import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService)

  const configSwagger = new DocumentBuilder()
    .setTitle('Weather dashboard')
    .setDescription('The weathers API description')
    .setVersion('1.0')
    .addTag('apis')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(
    config.get<number>('appConfig.port'),
    config.get<string>("appConfig.host"),
    () => console.log(`Server running port on ${config.get<number>('appConfig.port')}`)
  );
}
bootstrap();
