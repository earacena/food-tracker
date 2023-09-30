import { FoodItems } from '..';
import { renderApp } from '@/utils/tests';

describe('FoodItems', () => {
  it('should render an appropriate heading', async () => {
    const result = renderApp(<FoodItems />);

    expect(await result.findByRole('heading')).toHaveTextContent('Food Items');
  });
});
