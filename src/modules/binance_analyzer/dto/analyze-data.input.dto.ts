import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

import {type KlineInterval} from "binance";
import {IsString} from "class-validator";

export class BinanceAnalyzeDataInputDTO {
  @ApiPropertyOptional({
    required: true,
    enum: ['BTCUSDT'],
  })
  @IsString()
  symbol: string;

  @ApiProperty({
    required: true,
    enum: ['1s', '1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M']
  })
  @IsString()
  interval: KlineInterval;

  @ApiProperty({
    required: true,
    type: String,
    format: 'date-time',
  })
  @IsString()
  startTime: string;

  @ApiProperty({
    required: true,
    type: String,
    format: 'date-time',
  })
  @IsString()
  endTime: string;
}
