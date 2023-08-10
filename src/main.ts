import { CommissionCalculatorController } from './commissionCalculator/commissionCalculator.controller';

async function main() {
  const args = process.argv.slice(2);
  const controller = new CommissionCalculatorController();
  const result = await controller.calculateCommission(args);

  console.log(result);
}

main();
