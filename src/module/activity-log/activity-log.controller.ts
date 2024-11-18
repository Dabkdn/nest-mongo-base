import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { ActivityLog } from '../../entity/activity-log.entity';

@Controller('activity-logs')
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) {}

  @Post()
  async create(
    @Body() createActivityLogDto: CreateActivityLogDto, // Use DTO here
  ): Promise<ActivityLog> {
    return this.activityLogService.create(createActivityLogDto);
  }

  @Get()
  async findAll(): Promise<ActivityLog[]> {
    return this.activityLogService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.activityLogService.get(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createActivityLogDto: CreateActivityLogDto, // Use DTO here
  ): Promise<any> {
    return this.activityLogService.update(id, createActivityLogDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.activityLogService.delete(id);
  }
}
