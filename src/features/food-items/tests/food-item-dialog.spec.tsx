import { randomUUID } from 'node:crypto';
import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { renderApp } from '@/utils/tests';
import { FoodItemDialog } from '../food-item-dialog';
import { generateFoodItems } from './food-items.test-utils';

describe('foodItemDialog', () => {
  const foodItem = generateFoodItems({
    numOfGenerated: 1,
    userId: randomUUID(),
  }).at(0);

  it('should open a dialog when clicked', async () => {
    const user = userEvent.setup();

    if (foodItem) {
      renderApp(<FoodItemDialog foodItem={foodItem}>test</FoodItemDialog>);
    }

    const trigger = screen.getByRole('button');

    expect(trigger).toBeInTheDocument();

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should close when ESC is pressed', async () => {
    const user = userEvent.setup();

    if (foodItem) {
      renderApp(<FoodItemDialog foodItem={foodItem}>test</FoodItemDialog>);
    }

    const trigger = screen.getByRole('button');

    expect(trigger).toBeInTheDocument();

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should close when Enter is pressed immediately after opening', async () => {
    const user = userEvent.setup();

    if (foodItem) {
      renderApp(<FoodItemDialog foodItem={foodItem}>test</FoodItemDialog>);
    }

    const trigger = screen.getByRole('button');

    expect(trigger).toBeInTheDocument();

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Enter}');

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should contain the name of the food item as the title', async () => {
    const user = userEvent.setup();

    expect(foodItem).toBeDefined();

    if (!foodItem) {
      return;
    }

    renderApp(<FoodItemDialog foodItem={foodItem}>test</FoodItemDialog>);

    const trigger = screen.getByRole('button');

    expect(trigger).toBeInTheDocument();

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    expect(screen.getByRole('heading')).toHaveTextContent(foodItem.foodName);
  });

  it('should contain a section for calories per serving', async () => {
    const user = userEvent.setup();

    expect(foodItem).toBeDefined();

    if (!foodItem) {
      return;
    }

    renderApp(<FoodItemDialog foodItem={foodItem}>test</FoodItemDialog>);

    const trigger = screen.getByRole('button');

    expect(trigger).toBeInTheDocument();

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    expect(screen.getByText(/calories/i)).toBeInTheDocument();
  });

  it('should contain a section for serving size in grams', async () => {
    const user = userEvent.setup();

    expect(foodItem).toBeDefined();

    if (!foodItem) {
      return;
    }

    renderApp(<FoodItemDialog foodItem={foodItem}>test</FoodItemDialog>);

    const trigger = screen.getByRole('button');

    expect(trigger).toBeInTheDocument();

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    expect(screen.getByText('Serving Size (g)')).toBeInTheDocument();
  });

  it('should contain a section for serving size in units', async () => {
    const user = userEvent.setup();

    expect(foodItem).toBeDefined();

    if (!foodItem) {
      return;
    }

    renderApp(<FoodItemDialog foodItem={foodItem}>test</FoodItemDialog>);

    const trigger = screen.getByRole('button');

    expect(trigger).toBeInTheDocument();

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    expect(screen.getByText('Serving Size (units)')).toBeInTheDocument();
  });
});
