import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EmperorDetailPage from './pages/EmperorDetailPage'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/emperor/:id" element={<EmperorDetailPage />} />
      </Routes>
    </div>
  )
}

export default App