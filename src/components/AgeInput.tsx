import { useState } from 'react'

interface AgeInputProps {
  onAgeSubmit: (age: number) => void
  loading?: boolean
}

function AgeInput({ onAgeSubmit, loading = false }: AgeInputProps) {
  const [age, setAge] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const ageNum = parseInt(age)
    if (ageNum > 0 && ageNum < 150) {
      onAgeSubmit(ageNum)
    }
  }

  return (
    <div className="card">
      <h2 className="text-center mb-4">中国皇帝年龄查询</h2>
      <p className="text-center mb-4">输入年龄，查看在该年龄去世的中国皇帝</p>
      <form onSubmit={handleSubmit} className="text-center">
        <div className="mb-4">
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="请输入年龄（1-150）"
            min="1"
            max="150"
            className="input"
            style={{ maxWidth: '300px' }}
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="btn"
          disabled={loading || !age || parseInt(age) <= 0 || parseInt(age) > 150}
        >
          {loading ? '查询中...' : '查询皇帝'}
        </button>
      </form>
    </div>
  )
}

export default AgeInput