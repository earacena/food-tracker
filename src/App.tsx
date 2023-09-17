import { Routes, Route } from 'react-router-dom'

import './index.css'
import Dashboard from './features/Dashboard/Dashboard'
import ProfileForm from './features/Profile/ProfileForm'
import { Toaster } from './components/ui/Toaster'
import UserProvider from './features/User/UserProvider'
import { FoodItemForm } from './features/Food'

function App() {

  return (
    <div className="flex w-full h-full flex-col">
      <UserProvider>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/profile/form" element={<ProfileForm />} />
          <Route path="/foodItems/form" element={<FoodItemForm />} />
        </Routes>
      </UserProvider>
      <Toaster />
    </div>
  )
}

export default App
