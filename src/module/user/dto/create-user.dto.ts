import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ description: "The email of user, it is used for login." })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: "The password is ..." })
  @IsStrongPassword()
  readonly password: string;
}
