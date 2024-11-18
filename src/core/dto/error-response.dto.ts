import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class ErrorResponseDto {
  @ApiProperty()
  @IsString()
  readonly statusCode: number;

  @ApiProperty()
  @IsString()
  readonly message: string;

  @ApiProperty()
  @IsArray()
  readonly messages: string[];
}
