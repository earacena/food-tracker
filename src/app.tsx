import './index.css';
import { Suspense, lazy } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Routes, Route } from 'react-router-dom';
import { Loading } from './loading';

// Lazy load components
const EmailLoginForm = lazy(async () => ({
  default: (await import('./features/auth')).EmailLoginForm,
}));
const EmailSignUpForm = lazy(async () => ({
  default: (await import('./features/auth')).EmailSignUpForm,
}));
const LoginMenu = lazy(async () => ({
  default: (await import('./features/auth')).LoginMenu,
}));
const Dashboard = lazy(async () => ({
  default: (await import('./features/dashboard')).Dashboard,
}));
const ProfileForm = lazy(async () => ({
  default: (await import('./features/profile')).ProfileForm,
}));
const Toaster = lazy(async () => ({
  default: (await import('./components/ui/toaster')).Toaster,
}));
const FoodItems = lazy(async () => ({
  default: (await import('./features/food-items')).FoodItems,
}));
const FoodItemForm = lazy(async () => ({
  default: (await import('./features/food-items')).FoodItemForm,
}));
const Activities = lazy(async () => ({
  default: (await import('./features/activity')).Activities,
}));
const ActivityCalendar = lazy(async () => ({
  default: (await import('./features/activity')).ActivityCalendar,
}));
const ActivityForm = lazy(async () => ({
  default: (await import('./features/activity')).ActivityForm,
}));
const Meals = lazy(async () => ({
  default: (await import('./features/meals')).Meals,
}));
const MealEntryForm = lazy(async () => ({
  default: (await import('./features/meals')).MealEntryForm,
}));
const MealForm = lazy(async () => ({
  default: (await import('./features/meals')).MealForm,
}));
const Menu = lazy(async () => ({
  default: (await import('./features/menu')).Menu,
}));

export function App(): JSX.Element {
  return (
    <div className="flex w-full h-full flex-col items-start">
      <Menu />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<Dashboard />} index path="/" />
          <Route element={<ProfileForm />} path="/profile/form" />
          <Route element={<FoodItemForm />} path="/foodItems/form" />
          <Route element={<FoodItems />} path="/foodItems" />
          <Route element={<Meals />} path="/meals" />
          <Route element={<MealForm />} path="/meals/form" />
          <Route element={<MealEntryForm />} path="/mealEntries/form/:mealId" />
          <Route
            element={<Activities mainHeader pastActivity todayHeader />}
            path="/activities"
          />
          <Route element={<ActivityCalendar />} path="/activities/calendar" />
          <Route element={<ActivityForm />} path="/activities/form" />
          <Route element={<LoginMenu />} path="/signin" />
          <Route element={<EmailLoginForm />} path="/signin/email" />
          <Route element={<EmailSignUpForm />} path="/signup/email" />
        </Routes>
      </Suspense>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}
