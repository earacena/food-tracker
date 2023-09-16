import { Routes, Route } from 'react-router-dom'

import './index.css'
import Dashboard from './features/Dashboard/Dashboard'
import ProfileForm from './features/Profile/ProfileForm'
import { Toaster } from './components/ui/Toaster'
import UserProvider from './features/User/UserProvider'
import { useContext } from 'react'
import { AuthContext } from './features/Auth/AuthProvider'

function App() {
  const auth = useContext(AuthContext)

  return (
    <div className="flex w-full h-full flex-col">
      <span className='mx-auto mt-10'>
        {`Welcome back, ${auth?.userInfo?.username}`}
      </span>
      <UserProvider>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/profile/form" element={<ProfileForm />} />
        </Routes>
      </UserProvider>
      <Toaster />
    </div>
  )
}

export default App
