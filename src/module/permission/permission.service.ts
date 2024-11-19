import { Injectable } from "@nestjs/common";
import { PermissionRepository } from "../../repository/permission.repository";
import { Permission } from "../../entity/permission.entity";
import { ChangeRolePermissionDto } from "./dto/change-role-permission.dto";
import { RoleService } from "../role/role.service";

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async getAll(): Promise<Permission[]> {
    return this.permissionRepository.findAll();
  }

  async get(id: string): Promise<Permission | any> {
    return this.permissionRepository.findOne({ id });
  }

  async findByEmail(email: string): Promise<Permission | any> {
    return this.permissionRepository.findOne({ email });
  }

  async update(id: string, payload: any): Promise<Permission | any> {
    return this.permissionRepository.update(id, payload);
  }

  async delete(id: string): Promise<void> {
    return this.permissionRepository.remove(id);
  }

  async changeRolePermisson(
    payload: ChangeRolePermissionDto,
    roleService: RoleService
  ): Promise<any> {
    const { roleId, permissionIds } = payload;
    const role = await roleService.findOne({ id: roleId });
    if (!role) {
      throw new Error("Not found role");
    }
    const permissions = await this.permissionRepository.find({
      id: { $in: permissionIds },
    });

    if (permissions.length !== permissionIds.length) {
      throw new Error("Some permissions are invalid");
    }
    const newRolePermissions = permissions.map((permission) => permission._id);
    return roleService.update(role._id, { permissions: newRolePermissions });
  }

  async getRolePermissions(
    roleId: string,
    roleService: RoleService
  ): Promise<any> {
    const role = await roleService.findOne({ id: roleId });
    if (!role) {
      throw new Error("Not found role");
    }
    const permissions = await this.permissionRepository.findAll();

    return permissions.map((permission) => {
      return {
        ...permission,
        isActive:
          role.permissions?.some((rolePermission) =>
            rolePermission.equals(permission._id as any)
          ) || false,
      };
    });
  }
}
