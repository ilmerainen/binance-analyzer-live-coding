import {Injectable} from "@nestjs/common";
import {Kline} from "binance";

@Injectable()
export class BinanceAnalyzerService {
  // todo: do not use array indexes
  getPeriodForLowestPrice(input: Kline[]): (
    {
      openTime: Date;
      closeTime: Date;
    } | null
    ) {
    if (input.length === 0) {
      return null;
    }

    const lowestKline = input.sort((data1, data2) => {
      const lowPrice1 = +data1[3];
      const lowPrice2 = +data2[3];

      return lowPrice1 < lowPrice2 ? -1 : 1;
    })[0];

    return {
      openTime: new Date(lowestKline[0]),
      closeTime: new Date(lowestKline[6]),
    }
  }
}
