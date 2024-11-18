import { INestApplication } from "@nestjs/common";
import { Model } from "mongoose";
import { User } from "../src/entity/user.entity";
import { Role } from "../src/entity/role.entity";

export class UserSeed {
  static async run(app: INestApplication) {
    const userRepository = app.get<Model<User>>("UserModel");
    const roleRepository = app.get<Model<Role>>("RoleModel");

    const adminRole = await roleRepository.findOne({ name: "Admin" });
    const userRole = await roleRepository.findOne({ name: "User" });

    if (!adminRole || !userRole) {
      console.log("Roles not found, please seed roles first.");
      return;
    }

    const users = [
      {
        username: "admin",
        email: "admin@g.io",
        password: "password",
        roles: [adminRole.id],
      },
      {
        username: "ha",
        email: "ha.40091@g.io",
        password: "password",
        roles: [userRole.id],
      },
    ];

    for (const user of users) {
      const exists = await userRepository.findOne({ username: user.username });
      if (!exists) {
        await userRepository.create(user);
        console.log(`User ${user.username} created.`);
      } else {
        console.log(`User ${user.username} already exists.`);
      }
    }
  }
}
