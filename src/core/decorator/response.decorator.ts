import { ApiResponse } from "@nestjs/swagger";
import { applyDecorators } from "@nestjs/common";
import { ErrorResponseDto } from "../dto/error-response.dto";

export function CustomApiResponse(type: any = null) {
  return applyDecorators(
    ApiResponse({ status: 200, description: "Success", type }),
    ApiResponse({
      status: 400,
      description: "Bad request",
      type: ErrorResponseDto,
    }),
    ApiResponse({
      status: 401,
      description: "Unauthorized",
      type: ErrorResponseDto,
    }),
    ApiResponse({
      status: 403,
      description: "Forbidden",
      type: ErrorResponseDto,
    }),
    ApiResponse({
      status: 404,
      description: "Not found",
      type: ErrorResponseDto,
    }),
    ApiResponse({
      status: 500,
      description: "Internal server error",
      type: ErrorResponseDto,
    })
  );
}
