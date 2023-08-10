import { CommissionCalculatorController } from './commissionCalculator/commissionCalculator.controller';

describe('main', () => {
  it('should call `calculateCommission` method of `CommissionCalculatorController` with given arguments and output a result', async () => {
    // Arrange
    process.argv = ['node', 'file.ts', 'name', 'start date', 'end date'];
    const result = '123.00';
    const resultPromise = Promise.resolve(result);
    const calculateCommission = jest.fn(() => resultPromise);
    CommissionCalculatorController.prototype.calculateCommission =
      calculateCommission;
    console.log = jest.fn();

    // Act
    require('./main');

    // Assert
    expect(calculateCommission).toBeCalledWith(process.argv.slice(2));

    await resultPromise;
    expect(console.log).toBeCalledWith(result);
  });
});
