import { renderApp } from '@/utils/tests';
import { generateFoodItems } from './food-items.test-utils';
import { randomUUID } from 'crypto';
import { FoodListItem } from '../food-list-item';

describe('FoodListItem', () => {
  const foodItem = generateFoodItems({
    numOfGenerated: 1,
    userId: randomUUID(),
  }).at(0);

  it('should have a food name section', async () => {
    if (foodItem) {
      const result = renderApp(<FoodListItem foodItem={foodItem} />);

      expect(await result.findByText(/name/i)).toBeDefined();
    } else {
      throw new Error('undefined test data');
    }
  });

  it('should have calories per serving section', async () => {
    if (foodItem) {
      const result = renderApp(<FoodListItem foodItem={foodItem} />);

      expect(await result.findByText(/calories/i)).toBeDefined();
    } else {
      throw new Error('undefined test data');
    }
  });

  it('should have serving size section', async () => {
    if (foodItem) {
      const result = renderApp(<FoodListItem foodItem={foodItem} />);

      expect(await result.findByText(/serving/i)).toBeDefined();
    } else {
      throw new Error('undefined test data');
    }
  });
});
