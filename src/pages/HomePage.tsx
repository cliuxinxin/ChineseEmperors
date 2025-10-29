import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadEmperorData, getEmperorsByDeathAge, getAllDeathAges } from '../utils/dataLoader'
import { Emperor } from '../types/emperor'
import EmperorCard from '../components/EmperorCard'
import SearchInput from '../components/SearchInput'
import './HomePage.css'

const HomePage: React.FC = () => {
  const [age, setAge] = useState<number | ''>('')
  const [emperors, setEmperors] = useState<Emperor[]>([])
  const [availableAges, setAvailableAges] = useState<number[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true)
        const data = await loadEmperorData()
        setAvailableAges(getAllDeathAges(data))
      } catch (err) {
        setError('加载数据失败，请刷新页面重试')
      } finally {
        setLoading(false)
      }
    }

    initializeData()
  }, [])

  const handleSearch = async () => {
    if (age === '') {
      setEmperors([])
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await loadEmperorData()
      const results = getEmperorsByDeathAge(age, data)
      setEmperors(results)

      if (results.length === 0) {
        setError(`没有找到在 ${age} 岁去世的皇帝`)
      }
    } catch (err) {
      setError('搜索失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const handleEmperorClick = (emperorId: string) => {
    navigate(`/emperor/${emperorId}`)
  }

  return (
    <div className="home-page">
      <div className="search-section">
        <h2>查询在该年龄去世的皇帝</h2>
        <SearchInput
          age={age}
          onAgeChange={setAge}
          onSearch={handleSearch}
          availableAges={availableAges}
          loading={loading}
        />
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {emperors.length > 0 && (
        <div className="results-section">
          <h3>在 {age} 岁去世的皇帝 ({emperors.length} 位)</h3>
          <div className="emperor-grid">
            {emperors.map(emperor => (
              <EmperorCard
                key={emperor.id}
                emperor={emperor}
                onClick={() => handleEmperorClick(emperor.id)}
              />
            ))}
          </div>
        </div>
      )}

      {!age && emperors.length === 0 && !error && (
        <div className="welcome-section">
          <h3>欢迎使用中国皇帝年龄查询系统</h3>
          <p>输入一个年龄，查看在该年龄去世的中国皇帝及其生平成就。</p>
          <div className="feature-list">
            <div className="feature">
              <h4>📊 成就时间轴</h4>
              <p>查看每位皇帝在不同年龄的重要成就</p>
            </div>
            <div className="feature">
              <h4>🔍 精确查询</h4>
              <p>按死亡年龄精确查找对应的皇帝</p>
            </div>
            <div className="feature">
              <h4>📱 响应式设计</h4>
              <p>在手机和电脑上都能完美显示</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage