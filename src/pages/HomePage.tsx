import { useState } from 'react'
import AgeInput from '../components/AgeInput'
import EmperorCard from '../components/EmperorCard'
import { useEmperors } from '../hooks/useEmperors'
import { filterEmperorsByAge } from '../utils/dataUtils'
import { Emperor } from '../types/emperor'

function HomePage() {
  const { emperors, loading, error } = useEmperors()
  const [selectedAge, setSelectedAge] = useState<number | null>(null)
  const [filteredEmperors, setFilteredEmperors] = useState<Emperor[]>([])

  const handleAgeSubmit = (age: number) => {
    setSelectedAge(age)
    const filtered = filterEmperorsByAge(emperors, age)
    setFilteredEmperors(filtered)
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">加载皇帝数据中...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">错误: {error}</div>
      </div>
    )
  }

  return (
    <div className="container">
      <AgeInput onAgeSubmit={handleAgeSubmit} loading={loading} />

      {selectedAge !== null && (
        <div className="results-section">
          <h2 className="text-center mb-4">
            {filteredEmperors.length > 0
              ? `在 ${selectedAge} 岁去世的皇帝 (${filteredEmperors.length}位)`
              : `没有找到在 ${selectedAge} 岁去世的皇帝`
            }
          </h2>

          {filteredEmperors.length > 0 && (
            <div className="emperors-list">
              {filteredEmperors.map((emperor) => (
                <EmperorCard key={emperor.id} emperor={emperor} />
              ))}
            </div>
          )}
        </div>
      )}

      {selectedAge === null && (
        <div className="card text-center">
          <h3>欢迎使用中国皇帝年龄查询系统</h3>
          <p>请输入年龄，查询在该年龄去世的中国皇帝及其生平成就。</p>
          <p>目前系统中共有 {emperors.length} 位皇帝的数据。</p>
        </div>
      )}
    </div>
  )
}

export default HomePage