import { useContext } from 'react'
import './index.css'
import { AuthContext } from './components/auth/AuthProvider'

function App() {
  const auth = useContext(AuthContext)

  return (
    <>
      {auth?.isAuth ? "Authenticated!" : "Not Authenticated"}
    </>
  )
}

export default App
