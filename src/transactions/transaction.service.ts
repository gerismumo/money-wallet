import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/user/user.schema";
import { Wallet } from "src/wallets/wallet.schema";
import { Transaction } from "./transaction.schema";
import {Model} from 'mongoose';

@Injectable()

export class TransactionService {
    constructor(
        @InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>,
        @InjectModel(Transaction.name) private readonly transactionModel: Model<Transaction>,
    ) {}

    //user transactions function
    async addTransaction(userId: string, walletId: string, type: 'income' | 'expense', amount: number, description: string): Promise<any> {
        if (!Number.isInteger(amount) || amount <= 0) {
            throw new Error('Amount must be greater than zero or valid');
        }

        // Find the wallet for user
        const wallet = await this.walletModel.findOne({ _id: walletId, user: userId });

        if (!wallet) {
            throw new Error('Wallet not found');
        }

        // Calculate the new balance based on the transaction type
        if (type === 'expense' && wallet.balance < amount) {
            throw new Error('Insufficient balance for this expense');
        }

        const newBalance = type === 'income' ? wallet.balance + amount : wallet.balance - amount;

        // Create a new transaction
        const transaction = new this.transactionModel({
            wallet: wallet._id,
            type,
            amount,
            description
        });

        // Save the transaction and update the wallet balance
        await transaction.save();
        wallet.balance = newBalance;
        const updatedWallet = await wallet.save();

        return { transaction, updatedWallet };
    }
}