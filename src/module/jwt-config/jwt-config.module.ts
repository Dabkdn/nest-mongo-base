import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("AUTH_SECRET"),
        signOptions: {
          expiresIn: configService.get<string>("AUTH_EXPIRED_PERIOD"),
        },
      }),
    }),
  ],
  exports: [JwtModule],
})
export class JwtConfigModule {}
