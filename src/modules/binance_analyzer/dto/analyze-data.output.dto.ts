import { ApiProperty } from '@nestjs/swagger';

export class BinanceAnalyzeDataOutputDTO {
  @ApiProperty()
  openTime: Date;

  @ApiProperty()
  closeTime: Date;
}
