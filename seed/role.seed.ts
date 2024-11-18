import { INestApplication } from "@nestjs/common";
import { Model } from "mongoose";
import { Role } from "../src/entity/role.entity";

export class RoleSeed {
  static async run(app: INestApplication) {
    const roleRepository = app.get<Model<Role>>("RoleModel");

    const roles = [
      { name: "Admin", description: "Administrator role" },
      { name: "User", description: "Regular user role" },
    ];

    for (const role of roles) {
      const exists = await roleRepository.findOne({ name: role.name });
      if (!exists) {
        await roleRepository.create(role);
        console.log(`Role ${role.name} created.`);
      } else {
        console.log(`Role ${role.name} already exists.`);
      }
    }
  }
}
