import { createWrapper } from '@/utils/tests';
import { useFoodItems } from '..';
import { renderHook, waitFor } from '@testing-library/react';
import { server } from '../../../../setup-tests';
import { HttpResponse, http } from 'msw';
import { zFoodItems } from '../types/food-item.types';

describe('useFoodItems hook', () => {
  it('handles successfuly query', async () => {
    const { result } = renderHook(() => useFoodItems(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Follow list structure
    expect(result.current.data).toBeDefined();
    expect(result.current.data).toHaveLength(5);

    // Elements conform to expected shape
    expect(zFoodItems.safeParse(result.current.data).success).toBe(true);
  });

  it('handles unsuccessful query with internal server error', async () => {
    server.use(
      http.get('*', () => {
        return HttpResponse.json(
          {
            success: false,
            errorMessage: 'internal server error',
          },
          {
            status: 500,
          },
        );
      }),
    );

    const { result } = renderHook(() => useFoodItems(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });

  it('handles unsuccessful query with expired jwt token', async () => {
    server.use(
      http.get('*', () => {
        return HttpResponse.json(
          {
            success: false,
            errorMessage: 'jwt expired',
          },
          {
            status: 401,
          },
        );
      }),
    );

    const { result } = renderHook(() => useFoodItems(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });

  it('handles unsuccessful query with no authentication', async () => {
    server.use(
      http.get('*', () => {
        return HttpResponse.json(
          {
            success: false,
            errorMessage: 'must be authenticated to do this',
          },
          {
            status: 401,
          },
        );
      }),
    );

    const { result } = renderHook(() => useFoodItems(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
