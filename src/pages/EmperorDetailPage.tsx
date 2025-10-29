import { useParams, Link } from 'react-router-dom'
import { useEmperors } from '../hooks/useEmperors'
import AchievementTimeline from '../components/AchievementTimeline'
import ShareButton from '../components/ShareButton'
import { getEmperorById } from '../utils/dataUtils'
import { formatDate } from '../utils/dateUtils'

function EmperorDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { emperors, loading, error } = useEmperors()

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

  const emperor = getEmperorById(emperors, id || '')

  if (!emperor) {
    return (
      <div className="container">
        <div className="card">
          <h2>未找到该皇帝</h2>
          <p>抱歉，没有找到ID为 "{id}" 的皇帝信息。</p>
          <Link to="/" className="btn">返回首页</Link>
        </div>
      </div>
    )
  }

  const currentUrl = `${window.location.origin}${window.location.pathname}`

  return (
    <div className="container">
      <div className="card">
        <div className="detail-header">
          <h1>{emperor.name} ({emperor.temple_name})</h1>
          <div className="action-buttons">
            <Link to="/" className="btn">返回首页</Link>
            <ShareButton url={currentUrl} title={`${emperor.name} - ${emperor.temple_name}`} />
          </div>
        </div>

        <div className="emperor-info">
          <div className="info-row">
            <span className="info-label">朝代：</span>
            <span className="dynasty-badge">{emperor.dynasty}</span>
          </div>

          <div className="info-row">
            <span className="info-label">生卒年份：</span>
            <span>{formatDate(emperor.birth_date)} - {formatDate(emperor.death_date)}</span>
          </div>

          <div className="info-row">
            <span className="info-label">去世年龄：</span>
            <span className="death-age">{emperor.death_age}岁</span>
          </div>

          <div className="info-row">
            <span className="info-label">生平概述：</span>
            <p className="summary-text">{emperor.summary}</p>
          </div>
        </div>

        <AchievementTimeline achievements={emperor.achievements} />

        {emperor.sources.length > 0 && (
          <div className="sources-section">
            <h4>参考资料：</h4>
            <ul className="sources-list">
              {emperor.sources.map((source, index) => (
                <li key={index}>
                  {source.url ? (
                    <a href={source.url} target="_blank" rel="noopener noreferrer">
                      {source.title}
                    </a>
                  ) : (
                    source.title
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmperorDetailPage