import { Routes, Route } from 'react-router-dom'

import './index.css'
import Dashboard from './features/dashboard/dashboard'
import ProfileForm from './features/profile/profile-form'
import { Toaster } from './components/ui/toaster'
import UserProvider from './features/user/user-provider'
import { FoodItemForm } from './features/food-items'
import MealForm from './features/meals/meal-form'
import ActivityForm from './features/activity/activity-form'
import { Meals } from './features/meals'
import FoodItems from './features/food-items/food-items'
import Menu from './features/menu/menu'
import Activities from './features/activity/activities'
import MealEntryForm from './features/meals/meal-entry-form'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>

      <div className="flex w-full h-full flex-col items-start">
        <Menu />
        <UserProvider>
          <Routes>
            <Route
              index
              path="/"
              element={
                <Dashboard />
              }
            />

            <Route
              path="/profile/form"
              element={<ProfileForm />}
            />
            <Route
              path="/foodItems/form"
              element={<FoodItemForm />}
            />

            <Route
              path="/foodItems"
              element={<FoodItems />}
            />

            <Route
              path="/meals"
              element={<Meals />}
            />

            <Route
              path="/meals/form"
              element={<MealForm />}
            />

            <Route
              path="/mealEntries/form/:mealId"
              element={<MealEntryForm />}
            />


            <Route
              path="/activities"
              element={
                <Activities
                  onlyCurrentDay
                  noPastActivity={false}
                />
              }
            />

            <Route
              path="/activities/form"
              element={
                <ActivityForm />
              }
            />
          </Routes>
        </UserProvider>
        <Toaster />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
