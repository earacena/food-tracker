import { Routes, Route } from 'react-router-dom'

import './index.css'
import Dashboard from './features/Dashboard/Dashboard'
import ProfileForm from './features/Profile/ProfileForm'
import { Toaster } from './components/ui/Toaster'
import UserProvider from './features/User/UserProvider'
import { FoodItemForm } from './features/FoodItems'
import MealForm from './features/Meals/MealForm'
import ActivityForm from './features/Activity/ActivityForm'
import { Meals } from './features/Meals'
import FoodItems from './features/FoodItems/FoodItems'
import Menu from './features/Menu/Menu'
import Activities from './features/Activity/Activities'
import MealEntryForm from './features/Meals/MealEntryForm'
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
