import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { EnvironmentVariables } from "../../common/constant/env.constant";

@Module({
  imports: [
    JwtModule.register({
      secret: EnvironmentVariables.AUTH_SECRET,
      signOptions: { expiresIn: EnvironmentVariables.AUTH_EXPIRED_PERIOD },
    }),
  ],
  exports: [JwtModule],
})
export class JwtConfigModule {}
