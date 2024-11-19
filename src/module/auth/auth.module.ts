import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtConfigModule } from "../jwt-config/jwt-config.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [JwtConfigModule, UserModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
