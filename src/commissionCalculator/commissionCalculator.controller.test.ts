import { CommissionCalculatorController } from './commissionCalculator.controller';
import { CommissionCalculatorService } from './commissionCalculator.service';

describe('commissionCalculator.controller', () => {
  describe('calculateCommission', () => {
    it('should validate name', async () => {
      await expect(() =>
        new CommissionCalculatorController().calculateCommission([
          123 as unknown as string,
          '2023-01-01',
          '2024-01-01',
        ])
      ).rejects.toThrow('Expected string, received number');
    });

    it('should validate start date', async () => {
      await expect(() =>
        new CommissionCalculatorController().calculateCommission([
          'name',
          'invalid',
          '2024-01-01',
        ])
      ).rejects.toThrow('Invalid date');
    });

    it('should validate end date', async () => {
      await expect(() =>
        new CommissionCalculatorController().calculateCommission([
          'name',
          '2024-01-01',
          'invalid',
        ])
      ).rejects.toThrow('Invalid date');
    });

    it('should call CommissionCalculatorService.calculateCommission and format the result', async () => {
      const service = new CommissionCalculatorService();
      service.calculateCommission = jest.fn(async () => 123);

      const result = await new CommissionCalculatorController({
        service,
      }).calculateCommission(['name', '2024-01-01', '2024-01-01']);

      const date = new Date('2024-01-01');
      expect(service.calculateCommission).toBeCalledWith({
        salesRepName: 'name',
        startDate: date,
        endDate: date,
      });

      expect(result).toBe('123.00');
    });
  });
});
