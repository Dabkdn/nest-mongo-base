import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsArray } from "class-validator";

export class ChangeRolePermissionDto {
  @ApiProperty({ description: "The role ID" })
  @IsString()
  readonly roleId: string;

  @ApiProperty({ description: "The permission ids that enable for this role " })
  @IsArray()
  readonly permissionIds: string[];
}
