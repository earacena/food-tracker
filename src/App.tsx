import { useContext } from 'react'
import './index.css'
import { AuthContext } from './features/auth/AuthProvider'
import { UserCard } from './features/User'

function App() {
  const auth = useContext(AuthContext)
  return (
    <>
      {auth?.keycloak?.authenticated ? <UserCard /> : null}
    </>
  )
}

export default App
