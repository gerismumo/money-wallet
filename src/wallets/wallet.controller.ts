import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { WalletService } from "./wallet.service";

@Controller('wallet')

export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  //create new wallet
  @Post('/add/:userId')
  @HttpCode(HttpStatus.OK)
  async createWallet(@Param('userId') userId: string, @Body('name') walletName: string) {
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


    //get wallet details by userid
    @Get('/details/:walletId/:userId')
    @HttpCode(HttpStatus.OK)
    async getWalletDetails(
        @Param('walletId') walletId: string,
        @Param('userId') userId: string
    ) {
        try {
        const walletDetails = await this.walletService.getWalletDetails(walletId, userId);
        return { success: true, data: walletDetails, status: HttpStatus.OK };
        } catch (error) {
        return { success: false, message: error.message, status: HttpStatus.NOT_FOUND };
        }
    }
}