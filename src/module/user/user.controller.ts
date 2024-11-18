import { Controller, Get, Post, Body, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PermissionGuard } from '../../core/guard/permission.guard';
import { JwtAuthGuard } from '../../core/guard/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() payload: CreateUserDto, 
  ): Promise<User> {
    return this.userService.create(payload);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.userService.get(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: any, // Use DTO here
  ): Promise<any> {
    return this.userService.update(id, payload);
  }
}
