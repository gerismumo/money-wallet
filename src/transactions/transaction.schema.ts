import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ collection: 'transactions', timestamps: true })
export class Transaction extends Document {
  @Prop({ required: true })
  amount: number; 

  @Prop({ required: true })
  type: 'income' | 'expense';

  @Prop({ required: true })
  description: string; 

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' })
  wallet: string; 
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
