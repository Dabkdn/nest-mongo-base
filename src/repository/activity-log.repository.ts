import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "./base.repository";
import { ActivityLog } from "../entity/activity-log.entity";

@Injectable()
export class ActivityLogRepository extends BaseRepository<ActivityLog> {
  constructor(@InjectModel(ActivityLog.name) model: Model<ActivityLog>) {
    super(model);
  }
}
