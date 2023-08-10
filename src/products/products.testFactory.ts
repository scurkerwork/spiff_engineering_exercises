import { ProductRecord } from './products.repo';

export class ProductsTestFactory {
  static build(item?: Partial<ProductRecord>): ProductRecord {
    return {
      id: 1,
      name: 'product',
      product_amount: 1000,
      commission_rate: 0.05,
      ...item,
    };
  }
}
