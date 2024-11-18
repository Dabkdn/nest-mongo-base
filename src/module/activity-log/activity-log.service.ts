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

  async get(id: string): Promise<ActivityLog | any> {
    return this.activityLogRepository.findOne(id);
  }

  async update(
    id: string,
    updateActivityLogDto: any
  ): Promise<ActivityLog | any> {
    return this.activityLogRepository.update(id, updateActivityLogDto);
  }

  async delete(id: string): Promise<void> {
    return this.activityLogRepository.remove(id);
  }
}
