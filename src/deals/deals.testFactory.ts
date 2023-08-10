import { DealRecord } from './deals.repo';

export class DealsTestFactory {
  static build(item?: Partial<DealRecord>): DealRecord {
    return {
      id: 1,
      sales_rep_name: 'name',
      date: new Date(),
      quantity_products_sold: 1,
      product_id: 1,
      has_2x_multiplier: false,
      ...item,
    };
  }
}
