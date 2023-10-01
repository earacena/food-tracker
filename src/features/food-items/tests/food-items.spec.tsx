import { screen } from '@testing-library/react';
import { renderApp } from '@/utils/tests';
import { FoodItems } from '..';

describe('foodItems', () => {
  it('should render an appropriate heading', async () => {
    renderApp(<FoodItems />);

    expect(await screen.findByRole('heading')).toHaveTextContent('Food Items');
  });
});
