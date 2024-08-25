import { Body, Controller, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { TransactionService } from "./transaction.service";


@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post(':walletId')
  @HttpCode(HttpStatus.OK)
  async addTransaction(
    @Param('walletId') walletId: string,
    @Body('userId') userId: string,
    @Body('type') type: 'income' | 'expense',
    @Body('amount') amount: number,
    @Body('description') description: string,
  ) {
    try {
        if (!userId || !walletId || !type || !amount || !description) {
            throw new Error('All fields are required');
        }

        const result = await this.transactionService.addTransaction(userId, walletId, type, amount, description);

        return { success: true, message: `Transaction done successfully your balance is ${result.updatedWallet.balance}`, status: HttpStatus.OK };
    } catch (error) {
        return { success: false, message: error.message, status: HttpStatus.BAD_REQUEST };
    }
  }
}
