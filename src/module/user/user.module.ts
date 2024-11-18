import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../../entity/user.entity";
import { UserService } from "./user.service";
import { UserRepository } from "../../repository/user.repository";
import { UserController } from "./user.controller";
import { RoleModule } from "../role/role.module";
import { PermissionModule } from "../permission/permission.module";
import { JwtConfigModule } from "../jwt-config/jwt-config.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RoleModule,
    PermissionModule,
    JwtConfigModule
  ],
  providers: [UserService, UserRepository],
  exports: [MongooseModule, UserService],
  controllers: [UserController],
})
export class UserModule {}
