import { Injectable } from "@nestjs/common";
import { ActivityLog } from "../../entity/activity-log.entity";
import { ActivityLogRepository } from "../../repository/activity-log.repository";

@Injectable()
export class ActivityLogService {
  constructor(private readonly activityLogRepository: ActivityLogRepository) {}

  async create(createActivityLogDto: any): Promise<ActivityLog> {
    return this.activityLogRepository.create(createActivityLogDto);
  }

  async getAll(): Promise<ActivityLog[]> {
    return this.activityLogRepository.findAll();
  }
}
