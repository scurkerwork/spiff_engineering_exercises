import { DealRecord, DealsRepo } from '../deals/deals.repo';
import { ProductRecord, ProductsRepo } from '../products/products.repo';

export class CommissionCalculatorService {
  private dealsRepo: DealsRepo;
  private productsRepo: ProductsRepo;

  constructor({
    dealsRepo = new DealsRepo(),
    productsRepo = new ProductsRepo(),
  }: {
    dealsRepo?: DealsRepo;
    productsRepo?: ProductsRepo;
  } = {}) {
    this.dealsRepo = dealsRepo;
    this.productsRepo = productsRepo;
  }

  async calculateCommission({
    salesRepName,
    startDate,
    endDate,
  }: {
    salesRepName: string;
    startDate: Date;
    endDate: Date;
  }): Promise<number> {
    const deals = await this.dealsRepo.find({
      salesRepName,
      startDate,
      endDate,
    });

    const products = await this.productsRepo.find({
      ids: deals.map((deal) => deal.product_id),
    });

    return deals.reduce((result, deal) => {
      return result + this.calculateCommissionForADeal(deal, products);
    }, 0);
  }

  private calculateCommissionForADeal(
    deal: DealRecord,
    products: ProductRecord[]
  ): number {
    const product = products.find((product) => product.id === deal.product_id);

    if (!product) {
      throw new Error(`Product was not found for the deal #${deal.id}`);
    }

    let dealCommission =
      deal.quantity_products_sold *
      product.product_amount *
      product.commission_rate;

    if (deal.has_2x_multiplier) dealCommission *= 2;

    return dealCommission;
  }
}
