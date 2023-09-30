import { createWrapper } from '@/utils/tests';
import { useFoodItems } from '..';
import { renderHook, waitFor } from '@testing-library/react';
// import { zFoodItems } from "../types/food-item.types"
import { server } from '../../../../setup-tests';
import { rest } from 'msw';

describe('useFoodItems hook', () => {
  //  test('successful query hook', async () => {
  //    const { result } = renderHook(() => useFoodItems(), {
  //      wrapper: createWrapper()
  //    });
  //
  //    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  //
  //    // Follow list structure
  //    expect(result.current.data).toBeDefined();
  //    expect(result.current.data).toHaveLength(5);
  //
  //    // Elements conform to expected shape
  //    expect(zFoodItems.safeParse(result.current.data).success).toBe(true);
  //  })

  test('unsuccessful query hook', async () => {
    server.use(
      rest.get('*', (_req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    const { result } = renderHook(() => useFoodItems(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
