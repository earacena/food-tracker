import { server } from '../../../../setup-tests';
import { FoodItemList } from '../food-item-list';
import { renderApp } from '@/utils/tests';
import { HttpResponse, http } from 'msw';

describe('FoodItemList', () => {
  it('should contain a creation button', async () => {
    const result = renderApp(<FoodItemList />);

    expect(await result.findByRole('button')).toHaveTextContent(
      'Add Food Item',
    );
  });

  it('should contain a list when there are items', async () => {
    const result = renderApp(<FoodItemList />);

    expect(await result.findByRole('list')).toBeDefined();
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

    const result = renderApp(<FoodItemList />);

    expect(
      await result.findByText('Nothing here, add some items!'),
    ).toBeDefined();
  });
});
