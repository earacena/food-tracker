import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Dashboard } from './features/dashboard';
import { ProfileForm } from './features/profile';
import { Toaster } from './components/ui/toaster';
import { UserContext, UserProvider } from './features/user';
import { FoodItems, FoodItemForm } from './features/food-items';
import { Activities, ActivityForm } from './features/activity';
import { Meals, MealEntryForm, MealForm } from './features/meals';
import { Menu } from './features/menu';

const queryClient = new QueryClient();

export function App(): JSX.Element {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  useEffect(() => {
    if (user?.userProfile !== undefined && user.userProfile !== null) {
      navigate('/');
    }
  }, [navigate, user?.userProfile]);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex w-full h-full flex-col items-start">
        <Menu />
        <UserProvider>
          <Routes>
            <Route element={<Dashboard />} index path="/" />

            <Route element={<ProfileForm />} path="/profile/form" />

            <Route element={<FoodItemForm />} path="/foodItems/form" />

            <Route element={<FoodItems />} path="/foodItems" />

            <Route element={<Meals />} path="/meals" />

            <Route element={<MealForm />} path="/meals/form" />

            <Route
              element={<MealEntryForm />}
              path="/mealEntries/form/:mealId"
            />

            <Route
              element={<Activities noPastActivity={false} onlyCurrentDay />}
              path="/activities"
            />

            <Route element={<ActivityForm />} path="/activities/form" />
          </Routes>
        </UserProvider>
        <Toaster />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
