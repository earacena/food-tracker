import { HttpResponse, http } from 'msw';
import { screen } from '@testing-library/react';
import { renderApp } from '@/utils/tests';
import { server } from '../../../../setup-tests';
import { FoodItemList } from '../food-item-list';

describe('foodItemList', () => {
  it('should contain a creation button', async () => {
    renderApp(<FoodItemList />);

    expect(await screen.findByRole('button')).toHaveTextContent(
      'Add Food Item',
    );
  });

  it('should contain a list when there are items', async () => {
    renderApp(<FoodItemList />);

    expect(await screen.findByRole('list')).toBeDefined();
  });

  it('should display a message when there are no items', async () => {
    server.use(
      http.get('*', () =>
        HttpResponse.json(
          { success: true, data: { userFoodItems: [] } },
          { status: 200 },
        ),
      ),
    );

    renderApp(<FoodItemList />);

    expect(
      await screen.findByText('Nothing here, add some items!'),
    ).toBeDefined();
  });
});
