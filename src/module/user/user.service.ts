import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../repository/user.repository";
import { User } from "../../entity/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { RoleRepository } from "../../repository/role.repository";
import { passwordUtil } from "../../common/util/password.util";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository
  ) {}

  async create(payload: CreateUserDto): Promise<User> {
    const userRole = await this.roleRepository.findOne({ name: "User" });
    if (!userRole) {
      throw new Error("Not found user role.");
    }
    const hashedPassword = await passwordUtil.hashPassword(payload.password)
    return this.userRepository.create({
      ...payload,
      password: hashedPassword,
      roles: [userRole.id],
    });
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async get(id: string): Promise<User | any> {
    return this.userRepository.findOne({ id });
  }

  async findByEmail(email: string): Promise<User | any> {
    return this.userRepository.findOne({ email });
  }

  async update(id: string, payload: any): Promise<User | any> {
    return this.userRepository.update(id, payload);
  }

  async delete(id: string): Promise<void> {
    return this.userRepository.remove(id);
  }
}
