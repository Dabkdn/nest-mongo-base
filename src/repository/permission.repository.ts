import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "./base.repository";
import { Permission, PermissionDocument } from "../entity/permission.entity";

@Injectable()
export class PermissionRepository extends BaseRepository<PermissionDocument> {
  constructor(@InjectModel(Permission.name) model: Model<PermissionDocument>) {
    super(model);
  }
}
