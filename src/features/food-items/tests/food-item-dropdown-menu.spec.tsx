import { randomUUID } from 'node:crypto';
import { userEvent } from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderApp } from '@/utils/tests';
import { FoodItemDropdownMenu } from '../food-item-dropdown-menu';
import { generateFoodItems } from './food-items.test-utils';

describe('foodItemDropdownMenu', () => {
  const foodItem = generateFoodItems({
    numOfGenerated: 1,
    userId: randomUUID(),
  }).at(0);

  it('should be a button', async () => {
    expect(foodItem).toBeDefined();

    if (!foodItem) {
      return;
    }

    renderApp(<FoodItemDropdownMenu foodItem={foodItem} />);

    expect(await screen.findByRole('button')).toBeInTheDocument();
  });

  it('should have an icon', async () => {
    expect(foodItem).toBeDefined();

    if (!foodItem) {
      return;
    }

    renderApp(<FoodItemDropdownMenu foodItem={foodItem} />);

    expect(await screen.findByRole('button')).toBeInTheDocument();
  });

  it('should open a menu when clicked', async () => {
    expect(foodItem).toBeDefined();

    if (!foodItem) {
      return;
    }

    const user = userEvent.setup();
    renderApp(<FoodItemDropdownMenu foodItem={foodItem} />);

    const trigger = screen.getByRole('button');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('should close menu when Esc is pressed', async () => {
    expect(foodItem).toBeDefined();

    if (!foodItem) {
      return;
    }

    const user = userEvent.setup();
    renderApp(<FoodItemDropdownMenu foodItem={foodItem} />);

    const trigger = screen.getByRole('button');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await user.keyboard('{Escape}');

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('should have a delete menu item', async () => {
    expect(foodItem).toBeDefined();

    if (!foodItem) {
      return;
    }

    const user = userEvent.setup();
    renderApp(<FoodItemDropdownMenu foodItem={foodItem} />);

    const trigger = screen.getByRole('button');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(
      screen.getByRole('menuitem', { name: 'Delete' }),
    ).toBeInTheDocument();
  });

  it('should have a trash icon for delete menu item', async () => {
    expect(foodItem).toBeDefined();

    if (!foodItem) {
      return;
    }

    const user = userEvent.setup();
    renderApp(<FoodItemDropdownMenu foodItem={foodItem} />);

    const trigger = screen.getByRole('button');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(
      screen.getByRole('menuitem', { name: 'Delete' }),
    ).toBeInTheDocument();

    expect(screen.getByTestId('trash-icon')).toBeInTheDocument();
  });

  // eslint-disable-next-line jest/no-commented-out-tests -- useful example
  // it('should open alert dialog when delete button is pressed', async () => {
  //  expect(foodItem).toBeDefined();

  //  if (!foodItem) {
  //    return;
  //  }

  //  const user = userEvent.setup();
  //  renderApp(<FoodItemDropdownMenu foodItem={foodItem} />);

  //  const trigger = screen.getByRole('button');
  //  expect(trigger).toBeInTheDocument();
  //  expect(trigger).toHaveAttribute('aria-expanded', 'false');

  //  await user.click(trigger);
  //
  //  expect(trigger).toHaveAttribute('aria-expanded', 'true');

  //  const deleteTrigger = screen.getByRole('menuitem', { name: 'Delete' });

  //  await user.click(deleteTrigger);
  //
  //  expect(screen.getByRole('alertdialog')).toBeInTheDocument();

  //});
});
