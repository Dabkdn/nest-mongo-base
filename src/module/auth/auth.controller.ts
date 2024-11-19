import { Controller, Post, UseGuards, Body, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "../../core/guard/auth.guard";
import { LoginDto } from "./dto/login.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto, {
      userService: this.userService,
      jwtService: this.jwtService,
    });
  }

  @Post("test")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  test(@Request() req: any) {
    console.log(req.user);
    return "Protected route accessed!";
  }
}
