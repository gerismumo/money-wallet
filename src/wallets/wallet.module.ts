import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Wallet, WalletSchema } from "./wallet.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: Wallet.name, schema: WalletSchema}])],
    providers: [],
    controllers: [],
})

export class WalletModule {}