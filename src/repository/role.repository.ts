import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "./base.repository";
import { Role, RoleDocument } from "../entity/role.entity";

@Injectable()
export class RoleRepository extends BaseRepository<RoleDocument> {
  constructor(@InjectModel(Role.name) model: Model<RoleDocument>) {
    super(model);
  }

  public async getOneRoleWithPermissions(
    roleId: string
  ): Promise<RoleDocument | null> {
    return this.model
      .findOne({ id: roleId })
      .populate({
        path: "permissions",
        model: "Permission",
      })
      .exec();
  }
}
