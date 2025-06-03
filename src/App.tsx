import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { Login } from './pages/login'

function App() {
  return (
    <div className="flex flex-col items-center justify-start w-full h-full min-h-screen">
      <Routes>
        <Route
          path="/login"
          element={
            <div className="bg-gradient-to-b from-gradient-initial to-gradient-final">
              <Login />
            </div>
          }
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
