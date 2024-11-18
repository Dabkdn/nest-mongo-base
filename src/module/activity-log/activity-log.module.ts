import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ActivityLogService } from "./activity-log.service";
import {
  ActivityLog,
  ActivityLogSchema,
} from "../../entity/activity-log.entity";
import { ActivityLogRepository } from "../../repository/activity-log.repository";
import { ActivityLogController } from "./activity-log.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ActivityLog.name, schema: ActivityLogSchema },
    ]),
  ],
  providers: [ActivityLogService, ActivityLogRepository],
  exports: [ActivityLogService],
  controllers: [ActivityLogController],
})
export class ActivityLogModule {}
