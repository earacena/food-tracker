import { randomUUID } from 'node:crypto';
import { screen } from '@testing-library/react';
import { renderApp } from '@/utils/tests';
import { FoodListItem } from '../food-list-item';
import { generateFoodItems } from './food-items.test-utils';

describe('foodListItem', () => {
  const foodItem = generateFoodItems({
    numOfGenerated: 1,
    userId: randomUUID(),
  }).at(0);

  it('should have a food name section', async () => {
    if (foodItem) {
      renderApp(<FoodListItem dropdown={false} foodItem={foodItem} />);
    }

    expect(await screen.findByText(/name/i)).toBeDefined();
  });

  it('should have calories per serving section', async () => {
    if (foodItem) {
      renderApp(<FoodListItem dropdown={false} foodItem={foodItem} />);
    }

    expect(await screen.findByText(/calories/i)).toBeDefined();
  });

  it('should have serving size in grams section', async () => {
    if (foodItem) {
      renderApp(<FoodListItem dropdown={false} foodItem={foodItem} />);
    }

    expect(await screen.findByText('Serving (g)')).toBeDefined();
  });

  it('should have serving size in units section', async () => {
    if (foodItem) {
      renderApp(<FoodListItem dropdown={false} foodItem={foodItem} />);
    }

    expect(await screen.findByText('Serving (unit)')).toBeDefined();
  });
});
