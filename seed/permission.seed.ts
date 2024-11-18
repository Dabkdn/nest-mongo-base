import { INestApplication } from "@nestjs/common";
import { Model } from "mongoose";
import { Permission } from "../src/entity/permission.entity";

export class PermissionSeed {
  static async run(app: INestApplication) {
    const permissionRepository = app.get<Model<Permission>>("PermissionModel");

    const permissions = [
      { method: "POST", path: "/users", name: "create-user" },
      { method: "GET", path: "/users", name: "get-list-user" },
      { method: "GET", path: "/users/:id", name: "get-one-user" },
      { method: "PATCH", path: "/users/:id", name: "update-user" },
    ];

    for (const permission of permissions) {
      const exists = await permissionRepository.findOne({
        name: permission.name,
      });
      if (!exists) {
        await permissionRepository.create(permission);
        console.log(`Permission ${permission.name} created.`);
      } else {
        console.log(`Permission ${permission.name} already exists.`);
      }
    }
  }
}
