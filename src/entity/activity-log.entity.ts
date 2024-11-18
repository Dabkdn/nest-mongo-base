import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ActivityLogDocument = ActivityLog & Document;

@Schema({ timestamps: true, collection: 'activity_logs' })
export class ActivityLog {
  @Prop()
  log: string;

  @Prop()
  type: number;
}

export const ActivityLogSchema = SchemaFactory.createForClass(ActivityLog);