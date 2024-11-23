import { Injectable } from "@nestjs/common";
import { RoleRepository } from "../../repository/role.repository";

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async getRepository() {
    return this.roleRepository;
  }

  async findOne(params: any) {
    return this.roleRepository.findOne(params);
  }

  async update(id: any, params: any) {
    return this.roleRepository.update(id, params);
  }

  async getOneRoleWithPermissions(id: string) {
    return this.roleRepository.getOneRoleWithPermissions(id);
  }
}
