// seeds/database.seed.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "../src/app.module"; // Ensure the path matches your setup
import { RoleSeed } from "./role.seed";
import { UserSeed } from "./user.seed";
import { PermissionSeed } from "./permission.seed";

async function bootstrap() {
  const app: any = await NestFactory.createApplicationContext(AppModule);
  console.log("Starting seeding process...");

  try {
    // await RoleSeed.run(app);
    // await UserSeed.run(app);
    await PermissionSeed.run(app)
    console.log("Seeding completed successfully!");
  } catch (err) {
    console.error("Error during seeding:", err);
  } finally {
    await app.close();
  }
}

bootstrap();
