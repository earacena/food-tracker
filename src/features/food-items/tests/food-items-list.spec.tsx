import { FoodItemList } from '../food-item-list';
import { renderApp } from '@/utils/tests';

describe('FoodItemList', () => {
  it('should contain a creation button', async () => {
    const result = renderApp(<FoodItemList />);

    expect(await result.findByRole('button')).toHaveTextContent(
      'Add Food Item',
    );
  });

  //  it('should contain a list', async () => {
  //    const result = renderApp(<FoodItemList />);
  //
  //    expect(await result.findByRole('list')).toBeDefined();
  //  })
});
