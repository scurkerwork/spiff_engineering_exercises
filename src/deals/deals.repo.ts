import dealsRawData from '../../data/deals.json';

export type DealRecord = {
  id: number;
  sales_rep_name: string;
  date: Date;
  quantity_products_sold: number;
  product_id: number;
  has_2x_multiplier: boolean;
};

export class DealsRepo {
  private allRecords: DealRecord[];

  constructor(allRecords?: DealRecord[]) {
    this.allRecords = allRecords ?? this.normalizeJSONData();
  }

  async find({
    salesRepName,
    startDate,
    endDate,
  }: { salesRepName?: string; startDate?: Date; endDate?: Date } = {}): Promise<
    DealRecord[]
  > {
    let result = this.allRecords;

    if (salesRepName !== undefined || startDate || endDate) {
      result = result.filter((item) => {
        if (salesRepName && item.sales_rep_name !== salesRepName) return false;
        if (startDate && item.date < startDate) return false;
        if (endDate && item.date > endDate) return false;
        return true;
      });
    }

    return result;
  }

  private normalizeJSONData() {
    type DealRawRecord = {
      id: number;
      sales_rep_name: string;
      date: string;
      quantity_products_sold: number;
      product_id: number;
      has_2x_multiplier: number;
    };

    return dealsRawData.map((item: DealRawRecord) => ({
      ...item,
      date: new Date(item.date),
      has_2x_multiplier: Boolean(item.has_2x_multiplier),
    }));
  }
}
