import { CommissionCalculatorService } from './commissionCalculator.service';
import { DealRecord, DealsRepo } from '../deals/deals.repo';
import { DealsTestFactory } from '../deals/deals.testFactory';
import { ProductRecord, ProductsRepo } from '../products/products.repo';
import { ProductsTestFactory } from '../products/products.testFactory';

const now = new Date();

const buildDeal = (item?: Partial<DealRecord>): DealRecord => {
  return DealsTestFactory.build({
    date: now,
    ...item,
  });
};

const buildProduct = (item?: Partial<ProductRecord>): ProductRecord => {
  return ProductsTestFactory.build({
    ...item,
  });
};

describe('commissionCalculator.service', () => {
  describe('calculateCommission', () => {
    it('should multiply commission by `quantity_products_sold` from deals', async () => {
      const quantity_products_sold = 10;

      const dealsRepo = new DealsRepo([buildDeal({ quantity_products_sold })]);
      const productsRepo = new ProductsRepo([
        buildProduct({ product_amount: 1, commission_rate: 1 }),
      ]);

      const result = await new CommissionCalculatorService({
        dealsRepo,
        productsRepo,
      }).calculateCommission({
        salesRepName: 'name',
        startDate: now,
        endDate: now,
      });

      expect(result).toBe(quantity_products_sold);
    });

    it('should multiply commission by `product_amount` from products', async () => {
      const product_amount = 20;

      const dealsRepo = new DealsRepo([
        buildDeal({ quantity_products_sold: 1 }),
      ]);
      const productsRepo = new ProductsRepo([
        buildProduct({
          product_amount,
          commission_rate: 1,
        }),
      ]);

      const result = await new CommissionCalculatorService({
        dealsRepo,
        productsRepo,
      }).calculateCommission({
        salesRepName: 'name',
        startDate: now,
        endDate: now,
      });

      expect(result).toBe(product_amount);
    });

    it('should multiply commission by `commission_rate` from products', async () => {
      const commission_rate = 0.123;

      const dealsRepo = new DealsRepo([
        buildDeal({ quantity_products_sold: 1 }),
      ]);
      const productsRepo = new ProductsRepo([
        buildProduct({
          product_amount: 1,
          commission_rate,
        }),
      ]);

      const result = await new CommissionCalculatorService({
        dealsRepo,
        productsRepo,
      }).calculateCommission({
        salesRepName: 'name',
        startDate: now,
        endDate: now,
      });

      expect(result).toBe(commission_rate);
    });

    it('should multiply commission by 2 if the deal has `has_2x_multiplier`', async () => {
      const product_amount = 1000;

      const dealsRepo = new DealsRepo([
        buildDeal({ quantity_products_sold: 1, has_2x_multiplier: true }),
      ]);
      const productsRepo = new ProductsRepo([
        buildProduct({
          product_amount,
          commission_rate: 1,
        }),
      ]);

      const result = await new CommissionCalculatorService({
        dealsRepo,
        productsRepo,
      }).calculateCommission({
        salesRepName: 'name',
        startDate: now,
        endDate: now,
      });

      expect(result).toBe(product_amount * 2);
    });

    it('should calculate 4290 for quantity_products_sold = 3, product_amount = $13,000, commission_rate = 0.11', async () => {
      const dealsRepo = new DealsRepo([
        buildDeal({ quantity_products_sold: 3 }),
      ]);
      const productsRepo = new ProductsRepo([
        buildProduct({
          product_amount: 13000,
          commission_rate: 0.11,
        }),
      ]);

      const result = await new CommissionCalculatorService({
        dealsRepo,
        productsRepo,
      }).calculateCommission({
        salesRepName: 'name',
        startDate: now,
        endDate: now,
      });

      expect(result).toBe(4290);
    });
  });
});
