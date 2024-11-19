import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcryptjs";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor() {}

  async validateUser(
    email: string,
    password: string,
    userService: UserService
  ): Promise<any> {
    const user = await userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(
    payload: LoginDto,
    services: { userService: UserService; jwtService: JwtService }
  ) {
    const isValidUser = await this.validateUser(
      payload.email,
      payload.password,
      services.userService
    );
    if (!isValidUser) {
      throw new Error("Incorrect credentials, please check them again.");
    }
    const data: any = { email: isValidUser.email, sub: isValidUser.id };
    return {
      access_token: services.jwtService.sign(data),
    };
  }
}
