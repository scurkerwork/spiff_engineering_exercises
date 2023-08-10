import { DealsRepo } from './deals.repo';
import dayjs from 'dayjs';
import { DealsTestFactory } from './deals.testFactory';

const buildDeal = DealsTestFactory.build;

describe('deals.repo', () => {
  describe('find', () => {
    it('should return all deals', async () => {
      const data = [buildDeal(), buildDeal(), buildDeal()];

      const result = await new DealsRepo(data).find();

      expect(result).toEqual(data);
    });

    it('should filter deals by a start date', async () => {
      const now = new Date();
      const monthAgo = dayjs().subtract(1, 'month').toDate();
      const twoMonthsAgo = dayjs().subtract(2, 'month').toDate();

      const data = [
        buildDeal({
          date: now,
        }),
        buildDeal({
          date: monthAgo,
        }),
        buildDeal({
          date: twoMonthsAgo,
        }),
      ];

      const result = await new DealsRepo(data).find({
        startDate: monthAgo,
      });

      expect(result).toEqual([data[0], data[1]]);
    });

    it('should filter deals by an end date', async () => {
      const now = new Date();
      const monthAgo = dayjs().subtract(1, 'month').toDate();
      const twoMonthsAgo = dayjs().subtract(2, 'month').toDate();

      const data = [
        buildDeal({
          date: now,
        }),
        buildDeal({
          date: monthAgo,
        }),
        buildDeal({
          date: twoMonthsAgo,
        }),
      ];

      const result = await new DealsRepo(data).find({
        endDate: monthAgo,
      });

      expect(result).toEqual([data[1], data[2]]);
    });

    it('should filter by a sales rep name', async () => {
      const data = [
        buildDeal({
          sales_rep_name: 'one',
        }),
        buildDeal({
          sales_rep_name: 'one',
        }),
        buildDeal({
          sales_rep_name: 'two',
        }),
        buildDeal({
          sales_rep_name: 'three',
        }),
      ];

      const result = await new DealsRepo(data).find({
        salesRepName: 'one',
      });

      expect(result).toEqual([data[0], data[1]]);
    });
  });
});
