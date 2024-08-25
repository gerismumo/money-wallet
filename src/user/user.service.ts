import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  //sign up user
  async signUp(firstName: string, lastName: string, userName: string, email: string, password: string): Promise<User> {
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const newUser = new this.userModel({
      firstName,
      lastName,
      userName,
      email,
      password
    });

    return newUser.save();
  }

  //sign in user
  async signIn(email: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = (password === user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

  //get user profile function
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
