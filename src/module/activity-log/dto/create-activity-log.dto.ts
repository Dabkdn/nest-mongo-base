import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt } from "class-validator";

export class CreateActivityLogDto {
  @ApiProperty({ description: "The content of the activity log" })
  @IsString()
  readonly log: string;

  @ApiProperty({ description: "The type of the activity log" })
  @IsInt()
  readonly type: number;
}
