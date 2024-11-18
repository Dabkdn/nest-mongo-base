import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ActivityLogModule } from "./module/activity-log/activity-log.module";
import { RoleModule } from "./module/role/role.module";
import { UserModule } from "./module/user/user.module";
import { AuthModule } from "./module/auth/auth.module";
import { EnvironmentVariables } from "./common/constant/env.constant";
import { PermissionModule } from "./module/permission/permission.module";
import { PermissionGuard } from "./core/guard/permission.guard";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./core/guard/auth.guard";
import { JwtConfigModule } from "./module/jwt-config/jwt-config.module";

@Module({
  imports: [
    MongooseModule.forRoot(
      `${EnvironmentVariables.DB_HOST}:${EnvironmentVariables.DB_PORT}/${EnvironmentVariables.DB_NAME}`
    ),
    ActivityLogModule,
    RoleModule,
    UserModule,
    AuthModule,
    PermissionModule,
    JwtConfigModule
  ],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: JwtAuthGuard,
  //   },
  //   {
  //     provide: APP_GUARD,
  //     useClass: PermissionGuard,
  //   },
  // ],
})
export class AppModule {}
