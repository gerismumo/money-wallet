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
}
