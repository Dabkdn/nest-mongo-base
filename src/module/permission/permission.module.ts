import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Permission, PermissionSchema } from "../../entity/permission.entity";
import { PermissionController } from "./permission.controller";
import { PermissionService } from "./permission.service";
import { PermissionRepository } from "../../repository/permission.repository";
import { RoleModule } from "../role/role.module";
import { JwtConfigModule } from "../jwt-config/jwt-config.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
    RoleModule,
    JwtConfigModule,
    forwardRef(() => UserModule)
  ],
  controllers: [PermissionController],
  providers: [PermissionService, PermissionRepository],
  exports: [MongooseModule, PermissionService, PermissionRepository],
})
export class PermissionModule {}
