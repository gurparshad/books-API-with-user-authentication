import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const swaggerConfig = new DocumentBuilder()
  .setTitle('Coding-4-Tomorrow')
  .setDescription('Backend Task - Swagger API doc')
  .setVersion('1.0')
  .addBearerAuth({ in: 'header', type: 'http' })
  .build();

  const doc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, doc);

  await app.listen(process.env.PORT || 3002);
}
bootstrap();
