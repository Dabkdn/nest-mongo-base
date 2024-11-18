// src/module/jwt-config/jwt-config.module.ts
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      secret: "your_jwt_secret",
      signOptions: { expiresIn: "60m" },
    }),
  ],
  exports: [JwtModule],
})
export class JwtConfigModule {}
