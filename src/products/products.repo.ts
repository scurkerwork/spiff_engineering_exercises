import productsRawData from '../../data/products.json';

export type ProductRecord = {
  id: number;
  name: string;
  product_amount: number;
  commission_rate: number;
};

export class ProductsRepo {
  constructor(private allRecords: ProductRecord[] = productsRawData) {}

  async find({ ids }: { ids?: number[] } = {}): Promise<ProductRecord[]> {
    let result = this.allRecords;

    if (ids) {
      result = result.filter((item) => ids.includes(item.id));
    }

    return result;
  }
}
