import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcryptjs";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(payload: LoginDto) {
    const isValidUser = await this.validateUser(payload.email, payload.password)
    console.log(isValidUser)
    if(!isValidUser) {
        throw new Error('Incorrect credentials, please check them again.')
    }
    const data: any = { email: isValidUser.email, sub: isValidUser.id };
    console.log(data)
    return {
      access_token: this.jwtService.sign(data),
    };
  }
}
