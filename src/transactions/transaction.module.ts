import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Transaction, TransactionSchema } from "./transaction.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: Transaction.name, schema:TransactionSchema}])],
    providers: [],
    controllers: [],
})

export class TransactionsModule {}