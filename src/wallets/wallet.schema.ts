import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Transaction } from 'src/transactions/transaction.schema';


@Schema({ collection: 'wallets' })
export class Wallet extends Document {
  @Prop({ required: true })
  name: string; 

  @Prop({default: 0 })
  balance: number; 

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }] })
  transactions: Transaction[]; 

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: string; 
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
