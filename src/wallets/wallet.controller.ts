import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { WalletService } from "./wallet.service";

@Controller('wallet')

export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  async createWallet(@Param('id') userId: string, @Body('name') walletName: string) {
    try {

        if(!userId || !walletName) {
            throw new Error('User ID and Wallet Name are required');
        }
         await this.walletService.createWallet(walletName, userId);

        return {success: true, message: "Wallet created successfully", status: HttpStatus.OK }
    }catch (error) {
        return { success: false, message: error.message, status: HttpStatus.BAD_REQUEST };
    }
    
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllWallets() {
    return {success: true, message: "check your wallet", status: HttpStatus.OK}
  }
}