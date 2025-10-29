import React from 'react'
import './SearchInput.css'

interface SearchInputProps {
  age: number | ''
  onAgeChange: (age: number | '') => void
  onSearch: () => void
  availableAges: number[]
  loading: boolean
}

const SearchInput: React.FC<SearchInputProps> = ({
  age,
  onAgeChange,
  onSearch,
  availableAges,
  loading
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <div className="search-input">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <input
            type="number"
            value={age}
            onChange={(e) => onAgeChange(e.target.value === '' ? '' : Number(e.target.value))}
            onKeyPress={handleKeyPress}
            placeholder="输入年龄（如：50）"
            min="1"
            max="120"
            className="age-input"
            disabled={loading}
          />
          <button
            type="submit"
            className="search-button"
            disabled={loading || age === ''}
          >
            {loading ? '搜索中...' : '查询'}
          </button>
        </div>
      </form>

      {availableAges.length > 0 && (
        <div className="available-ages">
          <p>可查询的年龄：</p>
          <div className="age-tags">
            {availableAges.map(availableAge => (
              <button
                key={availableAge}
                className={`age-tag ${age === availableAge ? 'active' : ''}`}
                onClick={() => {
                  onAgeChange(availableAge)
                  setTimeout(() => onSearch(), 100)
                }}
              >
                {availableAge}岁
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchInput