import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type PermissionDocument = Permission & Document;

@Schema({ timestamps: true, collection: 'permissions' })
export class Permission {
  @Prop({ default: uuidv4 }) 
  id: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  method: string;

  @Prop({ required: true })
  path: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
