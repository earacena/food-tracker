import { Routes, Route } from 'react-router-dom'

import './index.css'
import Dashboard from './features/Dashboard/Dashboard'

function App() {

  return (
    <Routes>
      <Route index element={<Dashboard />} />
    </Routes>
  )
}

export default App
