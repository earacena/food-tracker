import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '@/features/auth';

function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      // eslint-disable-next-line no-console -- console is used for testing
      log: console.log,
      // eslint-disable-next-line no-console -- console is used for testing
      warn: console.warn,
      // eslint-disable-next-line @typescript-eslint/no-empty-function -- error logging is silenced
      error: () => {},
    },
  });
}

type ReactWrapperFn = ({
  children,
}: {
  children: React.ReactNode;
}) => JSX.Element;

export function createWrapper(): ReactWrapperFn {
  const queryClient = createTestQueryClient();
  const wrapper = function ({
    children,
  }: {
    children: React.ReactNode;
  }): JSX.Element {
    return (
      <AuthContext.Provider
        value={{
          token: 'token',
          userId: crypto.randomUUID(),
          // eslint-disable-next-line @typescript-eslint/no-empty-function -- not necessary when using msw to mock requests
          setToken: () => {},
          // eslint-disable-next-line @typescript-eslint/no-empty-function -- not necessary when using msw to mock requests
          setUserId: () => {},
        }}
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </AuthContext.Provider>
    );
  };
  return wrapper;
}

export function renderApp(ui: React.ReactElement): RenderResult {
  const queryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <AuthContext.Provider
      value={{
        token: 'token',
        userId: crypto.randomUUID(),
        // eslint-disable-next-line @typescript-eslint/no-empty-function -- not necessary when using msw to mock requests
        setToken: () => {},
        // eslint-disable-next-line @typescript-eslint/no-empty-function -- not necessary when using msw to mock requests
        setUserId: () => {},
      }}
    >
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
      </BrowserRouter>
    </AuthContext.Provider>,
  );

  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) => {
      rerender(
        <AuthContext.Provider
          value={{
            token: 'token',
            userId: crypto.randomUUID(),
            // eslint-disable-next-line @typescript-eslint/no-empty-function -- not necessary when using msw to mock requests
            setToken: () => {},
            // eslint-disable-next-line @typescript-eslint/no-empty-function -- not necessary when using msw to mock requests
            setUserId: () => {},
          }}
        >
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              {rerenderUi}
            </QueryClientProvider>
          </BrowserRouter>
        </AuthContext.Provider>,
      );
    },
  };
}
