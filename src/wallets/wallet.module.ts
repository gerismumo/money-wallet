import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Wallet, WalletSchema } from "./wallet.schema";
import { WalletService } from "./wallet.service";
import { WalletController } from "./wallet.controller";
import { UserModule } from "src/user/user.module";
import { TransactionsModule } from "src/transactions/transaction.module";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Wallet.name, schema: WalletSchema}]),
        UserModule,
        forwardRef(() => TransactionsModule),
    ],
    providers: [WalletService],
    controllers: [WalletController],
    exports: [MongooseModule]
})

export class WalletModule {}