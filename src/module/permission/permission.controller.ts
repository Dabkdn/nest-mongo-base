import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { PermissionService } from "./permission.service";
import { Permission } from "../../entity/permission.entity";
import { ChangeRolePermissionDto } from "./dto/change-role-permission.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../core/guard/auth.guard";
import { PermissionGuard } from "../../core/guard/permission.guard";
import { RoleService } from "../role/role.service";

@Controller("permissions")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PermissionController {
  constructor(
    private readonly permissionService: PermissionService,
    private readonly roleService: RoleService
  ) {}

  @Get()
  async getAll(): Promise<Permission[]> {
    return this.permissionService.getAll();
  }

  @Get("/role/:roleId")
  async getRolePermissions(
    @Param("roleId") roleId: string
  ): Promise<Permission[]> {
    return this.permissionService.getRolePermissions(roleId, this.roleService);
  }

  @UseGuards(PermissionGuard)
  @Post("/change-role-permissions")
  async changeRolePermisson(@Body() payload: ChangeRolePermissionDto) {
    return this.permissionService.changeRolePermisson(
      payload,
      this.roleService
    );
  }
}
