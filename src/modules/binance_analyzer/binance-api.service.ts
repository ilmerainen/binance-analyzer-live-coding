import {Injectable} from "@nestjs/common";
import {MainClient} from "binance";
import {KlineInterval} from "binance/lib/types/shared";

@Injectable()
export class BinanceAPI {
  private binanceClient: MainClient;

  constructor() {
    this.binanceClient = new MainClient({});
  }

  async getHistoricalData({
                            symbol,
                            interval,
                            startTime,
                            endTime,
                          }: {
    symbol: string;
    interval: KlineInterval;
    startTime?: Date;
    endTime?: Date;
  }) {
    const res = await this.binanceClient.getKlines({
      symbol,
      interval,
      startTime: startTime ? startTime.getTime() : undefined,
      endTime: endTime ? endTime.getTime() : undefined,
    });

    return res;
  }
}
