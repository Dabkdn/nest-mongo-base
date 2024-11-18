import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from "@nestjs/common";
import { PermissionRepository } from "../../repository/permission.repository";
import { RoleRepository } from "../../repository/role.repository";
import { MESSAGE } from "../../common/constant/message.constant";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly roleRepository: RoleRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const role = await this.roleRepository.findOne({ id: user.roles[0] });

    if (!role) {
      throw new ForbiddenException(MESSAGE.COMMON.NO_PERMISSION);
    }
    if (role.name.toLowerCase() === "admin") {
      return true;
    }

    const { method, route } = request;

    const permission = await this.permissionRepository.findOne({
      method,
      path: route.path,
    });

    if (!permission) {
      throw new ForbiddenException(MESSAGE.COMMON.NOT_FOUND_PERMISSION);
    }

    if (
      !role?.permissions?.some((rolePermission) =>
        rolePermission.equals(permission._id as any)
      ) ||
      false
    ) {
      throw new ForbiddenException(MESSAGE.COMMON.NO_PERMISSION);
    }

    return true;
  }
}
