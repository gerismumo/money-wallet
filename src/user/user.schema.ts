import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';


@Schema({collection: 'users'})
export class User extends Document {
  @Prop({ required: true })
  firstName: string;
  
  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' }] })
  wallets: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
