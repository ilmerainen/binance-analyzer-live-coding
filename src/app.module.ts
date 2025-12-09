import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BinanceAnalyzerModule } from './modules/binance_analyzer/binance-analyzer.module';

// todo: should be fixed, use ConfigModule
const MONGODB_URL = process.env.MONGODB_URL as string;

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/binance_analyzer'),
    BinanceAnalyzerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
