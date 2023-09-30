import { AuthContext } from '@/features/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });
}

export function createWrapper() {
  const queryClient = createTestQueryClient();

  return ({ children }: { children: React.ReactNode }) => (
    <AuthContext.Provider
      value={{
        token: 'token',
        userId: crypto.randomUUID(),
        setToken: () => {},
        setUserId: () => {},
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthContext.Provider>
  );
}

export function renderApp(ui: React.ReactElement) {
  const queryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <AuthContext.Provider
      value={{
        token: 'token',
        userId: crypto.randomUUID(),
        setToken: () => {},
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
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <AuthContext.Provider
          value={{
            token: 'token',
            userId: crypto.randomUUID(),
            setToken: () => {},
            setUserId: () => {},
          }}
        >
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              {rerenderUi}
            </QueryClientProvider>
          </BrowserRouter>
        </AuthContext.Provider>,
      ),
  };
}
