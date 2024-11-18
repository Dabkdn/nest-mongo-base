import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { EnvironmentVariables } from './common/constant/env.constant';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true,  // Transform payloads to DTO types
    whitelist: true,  // Remove properties that are not in the DTO
  }));

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description for your application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Serve Swagger UI at the '/api' endpoint
  SwaggerModule.setup('documentation', app, document);
  // Set up port to listen to (default is 3000)
  await app.listen(3000);
  console.log(`Application is running on: ${EnvironmentVariables.HOST}:${EnvironmentVariables.PORT}`);
  console.log(`Documentation is running on: ${EnvironmentVariables.HOST}:${EnvironmentVariables.PORT}/documentation`);
}

bootstrap();
