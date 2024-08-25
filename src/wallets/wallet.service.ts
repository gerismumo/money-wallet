import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Wallet } from "./wallet.schema";
import { Model } from 'mongoose';
import { User } from "src/user/user.schema";
import { Transaction } from "src/transactions/transaction.schema";

@Injectable()
export class WalletService {
    constructor(
        @InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Transaction.name) private readonly transactionModel: Model<Transaction>
    ) {}

    //create new wallet
    async createWallet(walletName: string, userId: string): Promise<any> {

        const newWallet = new this.walletModel({
            name: walletName,
            balance: 0,
            transactions: [],
            user: userId
        });

        // Save the wallet to the database
        const savedWallet = await newWallet.save();

        if(!savedWallet) {
            throw new Error('Failed to create wallet');
        }

        //insert the wallet id to user object
        await this.userModel.findByIdAndUpdate(
            userId,
            { $push: { wallets: savedWallet._id } },
            { new: true }
        );

        // Return the saved wallet
        return savedWallet;
    }

    
    //user wallet details
    async getWalletDetails(walletId: string, userId: string): Promise<any> {
        const wallet = await this.walletModel.findOne({ _id: walletId, user: userId }).populate('transactions');
        
        if (!wallet) {
            throw new NotFoundException('Wallet not found');
        }

        const transactions = await this.transactionModel.find({ wallet: walletId });

        return {
            walletName: wallet.name,
            balance: wallet.balance,
            transactions: transactions.map((txn: any) => ({
                amount: txn.amount,
                type: txn.type,
                description: txn.description,
                date: txn.createdAt, 
            }))
        };
    }
}
