import { calculateCommissionArgsDTO } from './commissionCalculator.dto';
import { z } from 'zod';
import { CommissionCalculatorService } from './commissionCalculator.service';

export class CommissionCalculatorController {
  private argsDTO: z.ZodTypeAny;
  private service: CommissionCalculatorService;

  constructor({
    argsDTO = calculateCommissionArgsDTO,
    service = new CommissionCalculatorService(),
  }: {
    argsDTO?: z.ZodTypeAny;
    service?: CommissionCalculatorService;
  } = {}) {
    this.argsDTO = argsDTO;
    this.service = service;
  }

  async calculateCommission(args: string[]) {
    const [salesRepName, startDate, endDate] = this.argsDTO.parse(args);

    const amount = await this.service.calculateCommission({
      salesRepName,
      startDate,
      endDate,
    });

    return amount.toFixed(2);
  }
}
