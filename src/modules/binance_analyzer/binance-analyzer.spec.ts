import { Test } from '@nestjs/testing';
import { BinanceAPI } from './binance-api.service';
import { BinanceAnalyzerService } from './binance-analyzer.service';

/**
 * Only domain logic was tested due to the time limits.
 */
describe('BinanceAnalyzerModule', () => {
  let binanceApi: BinanceAPI;
  let binanceAnalyzer: BinanceAnalyzerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [BinanceAPI, BinanceAnalyzerService],
    }).compile();

    binanceApi = moduleRef.get(BinanceAPI);
    binanceAnalyzer = moduleRef.get(BinanceAnalyzerService);
  });

  describe(`BinanceAnalyzerService`, () => {
    it('should return the lowest price period for historical data', () => {
      const getPeriodForLowestPriceSpy = jest.spyOn(
        binanceAnalyzer,
        'getPeriodForLowestPrice',
      );
      const result = binanceAnalyzer.getPeriodForLowestPrice([
        [
          1499040000000, // Kline open time
          '0.01634790', // Open price
          '0.80000000', // High price
          '0.02', // Low price
          '0.01577100', // Close price
          '148976.11427815', // Volume
          1499644799999, // Kline Close time
          '2434.19055334', // Quote asset volume
          308, // Number of trades
          '1756.87402397', // Taker buy base asset volume
          '28.46694368', // Taker buy quote asset volume
          '0', // Unused field, ignore.
        ],
        [
          1499644799999, // Kline open time
          '0.01634790', // Open price
          '0.80000000', // High price
          '0.01', // Low price
          '0.01577100', // Close price
          '148976.11427815', // Volume
          1499644899999, // Kline Close time
          '2434.19055334', // Quote asset volume
          308, // Number of trades
          '1756.87402397', // Taker buy base asset volume
          '28.46694368', // Taker buy quote asset volume
          '0', // Unused field, ignore.
        ],
      ]);

      expect(getPeriodForLowestPriceSpy).toHaveBeenCalledTimes(1);
      expect(result).toMatchObject({
        openTime: expect.any(Date),
        closeTime: expect.any(Date),
      });
      expect(result?.openTime.getTime()).toEqual(1499644799999);
      expect(result?.closeTime.getTime()).toEqual(1499644899999);
    });

    it('should return null if an empty array is passed', () => {
      const result = binanceAnalyzer.getPeriodForLowestPrice([]);

      expect(result).toBeNull();
    });
  });
});
