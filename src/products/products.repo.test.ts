import { ProductRecord, ProductsRepo } from './products.repo';
import { ProductsTestFactory } from './products.testFactory';

const buildProduct = ProductsTestFactory.build;

describe('products.repo', () => {
  describe('find', () => {
    it('should return all products', async () => {
      const data = [buildProduct(), buildProduct(), buildProduct()];

      const result = await new ProductsRepo(data).find();

      expect(result).toEqual(data);
    });

    it('should return products filtered by product ids', async () => {
      const data = [
        buildProduct({ id: 1 }),
        buildProduct({ id: 2 }),
        buildProduct({ id: 3 }),
      ];

      const result = await new ProductsRepo(data).find({ ids: [1, 2] });

      expect(result).toEqual([data[0], data[1]]);
    });
  });
});
