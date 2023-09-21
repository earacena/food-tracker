import { Routes, Route } from 'react-router-dom'

import './index.css'
import Dashboard from './features/Dashboard/Dashboard'
import ProfileForm from './features/Profile/ProfileForm'
import { Toaster } from './components/ui/Toaster'
import UserProvider from './features/User/UserProvider'
import { FoodItemForm } from './features/FoodItems'
import { useFoodItems } from './features/FoodItems/hooks/foodItem.hooks'
import useActivities from './features/Activity/hooks/useActivities'
import useMeals from './features/Meals/hooks/useMeals'
import MealForm from './features/Meals/MealForm'
import ActivityForm from './features/Activity/ActivityForm'
import { Meals } from './features/Meals'
import FoodItems from './features/FoodItems/FoodItems'
import Menu from './features/Menu/Menu'
import Activities from './features/Activity/Activities'
import { useState } from 'react'

function App() {

  const [foodItems, setFoodItems] = useFoodItems()
  const [activities, setActivities] = useActivities()
  const [meals, mealEntries, setMeals] = useMeals()


  return (
    <div className="flex w-full h-full flex-col items-start">
      <Menu /> 
      <UserProvider>
        <Routes>
          <Route 
            index
            path="/"
            element={
              <Dashboard
                foodItems={foodItems}
                activities={activities}
                meals={meals}
                mealEntries={mealEntries}
              />
            } 
          />

          <Route 
            path="/profile/form"
            element={<ProfileForm />}
          />
          <Route
            path="/foodItems/form"
            element={<FoodItemForm setFoodItems={setFoodItems} />}
          />

          <Route
            path="/foodItems"
            element={<FoodItems foodItems={foodItems} />}
          />

          <Route
            path="/meals/form"
            element={<MealForm setMeals={setMeals} />}
          />

          <Route
            path="/meals"
            element={<Meals meals={meals} mealEntries={mealEntries} />}
          />

          <Route
            path="/activities"
            element={
              <Activities 
                foodItems={foodItems}
                meals={meals}
                mealEntries={mealEntries}
                activities={activities}
              />
            }
          />

          <Route
            path="/activities/form"
            element={
              <ActivityForm
                setActivities={setActivities}
                foodItems={foodItems}
                meals={meals}
              />
            }
          />
        </Routes>
      </UserProvider>
      <Toaster />
    </div>
  )
}

export default App
