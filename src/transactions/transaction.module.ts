import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Transaction, TransactionSchema } from "./transaction.schema";
import { TransactionService } from "./transaction.service";
import { TransactionController } from "./transaction.controller";
import { WalletModule } from "src/wallets/wallet.module";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Transaction.name, schema:TransactionSchema}]),
        forwardRef(() => WalletModule),
    ],
    providers: [TransactionService],
    controllers: [TransactionController],
    exports: [MongooseModule]
})

export class TransactionsModule {}