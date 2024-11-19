import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as dotenv from "dotenv";
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Transform payloads to DTO types
      whitelist: true, // Remove properties that are not in the DTO
    })
  );

  const config = new DocumentBuilder()
    .setTitle("API Documentation")
    .setDescription("API description for your application")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("documentation", app, document);

  await app.listen(3000);
  console.log(
    `Application is running on: ${process.env.HOST}:${process.env.PORT}`
  );
  console.log(
    `Documentation is running on: ${process.env.HOST}:${process.env.PORT}/documentation`
  );
}

bootstrap();
