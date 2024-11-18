import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Role } from './role.entity';

export type UserDocument = User & Document;

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ default: uuidv4 }) 
  id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  name: string;

  @Prop({ type: [{ type: SchemaTypes.String, ref: Role.name }] }) // Reference by UUID
  roles: Role[]; // Reference to the Role collection
}

export const UserSchema = SchemaFactory.createForClass(User);
