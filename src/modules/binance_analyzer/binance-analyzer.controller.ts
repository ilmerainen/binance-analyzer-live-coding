import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BinanceAPI } from './binance-api.service';
import { BinanceAnalyzeDataInputDTO } from './dto/analyze-data.input.dto';
import { BinanceAnalyzerService } from './binance-analyzer.service';
import { BinanceAnalyzeDataOutputDTO } from './dto/analyze-data.output.dto';

@ApiTags('binance-analyzer')
@Controller('binance-analyzer')
export class BinanceAnalyzerController {
  constructor(
    private readonly binanceApi: BinanceAPI,
    private readonly binanceAnalyzer: BinanceAnalyzerService,
  ) {}

  @ApiOperation({
    summary: 'Get the lowest price for period',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Open and close time for ',
    type: BinanceAnalyzeDataOutputDTO,
  })
  @Get('/lowest-price')
  async get(@Query() dto: BinanceAnalyzeDataInputDTO) {
    const data = await this.binanceApi.getHistoricalData({
      symbol: dto.symbol,
      startTime: new Date(dto.startTime),
      endTime: new Date(dto.endTime),
      interval: dto.interval,
    });
    const result = await this.binanceAnalyzer.getPeriodForLowestPrice(data);

    return result;
  }
}
