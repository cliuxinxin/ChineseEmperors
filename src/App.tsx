import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EmperorDetailPage from './pages/EmperorDetailPage'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>中国皇帝年龄查询</h1>
        <p>探索历代皇帝在不同年龄的成就与生平</p>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/emperor/:id" element={<EmperorDetailPage />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 中国皇帝年龄查询 - 数据来源于历史文献</p>
      </footer>
    </div>
  )
}

export default App