import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Wallet } from "./wallet.schema";
import { Model } from 'mongoose';
import { User } from "src/user/user.schema";

@Injectable()
export class WalletService {
    constructor(
        @InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>,
        @InjectModel(User.name) private readonly userModel: Model<User>
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

    //add money to user's wallet
    async addMoneyToWallet(userId: string, walletId: string, amount: number): Promise<any> {

        if (!Number.isInteger(amount) || amount <= 0) {
            throw new Error('Amount must be a positive integer');
        }

        const wallet = await this.walletModel.findOne({ _id: walletId, user: userId });

        if (!wallet) {
            throw new Error('Wallet not found');
        }

        wallet.balance += amount;

        const updatedWallet = await wallet.save();

        return updatedWallet;
    }

    //
    async getUserProfile(userId: string): Promise<any> {
        const user = await this.userModel.findById(userId).populate('wallets');

        if (!user) {
            throw new Error('User not found');
        }
    

        const overallBalance = user.wallets.reduce((total, wallet: any) => total + wallet.balance, 0);
    
        // profile summary
        const profileSummary = {
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
            overallBalance,
            wallets: user.wallets.map((wallet: any) => ({
                id: wallet._id,
                name: wallet.name,
                balance: wallet.balance,
            })),
        };
    
        return profileSummary;
    }
    
}
