import { Module } from '@nestjs/common';
import { BinanceAnalyzerController } from './binance-analyzer.controller';
import { BinanceAPI } from './binance-api.service';
import { BinanceAnalyzerService } from './binance-analyzer.service';

@Module({
  imports: [],
  controllers: [BinanceAnalyzerController],
  providers: [BinanceAPI, BinanceAnalyzerService],
})
export class BinanceAnalyzerModule {}
