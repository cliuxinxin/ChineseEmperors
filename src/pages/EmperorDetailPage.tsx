import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { loadEmperorData, getEmperorById } from '../utils/dataLoader'
import { Emperor } from '../types/emperor'
import AchievementTimeline from '../components/AchievementTimeline'
import './EmperorDetailPage.css'

const EmperorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [emperor, setEmperor] = useState<Emperor | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEmperor = async () => {
      if (!id) {
        setError('无效的皇帝ID')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const data = await loadEmperorData()
        const foundEmperor = getEmperorById(id, data)

        if (foundEmperor) {
          setEmperor(foundEmperor)
        } else {
          setError('未找到该皇帝的信息')
        }
      } catch (err) {
        setError('加载数据失败，请刷新页面重试')
      } finally {
        setLoading(false)
      }
    }

    fetchEmperor()
  }, [id])

  const copyShareLink = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url).then(() => {
      alert('链接已复制到剪贴板！')
    }).catch(() => {
      alert('复制失败，请手动复制链接')
    })
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>加载中...</p>
      </div>
    )
  }

  if (error || !emperor) {
    return (
      <div className="error-container">
        <h2>错误</h2>
        <p>{error}</p>
        <Link to="/" className="back-link">
          返回首页
        </Link>
      </div>
    )
  }

  return (
    <div className="emperor-detail-page">
      <div className="page-header">
        <Link to="/" className="back-link">
          ← 返回首页
        </Link>
        <div className="header-actions">
          <button onClick={copyShareLink} className="share-button">
            分享链接
          </button>
        </div>
      </div>

      <div className="emperor-profile">
        <div className="profile-header">
          <h1 className="emperor-name">{emperor.name}</h1>
          <div className="emperor-titles">
            <span className="temple-name">{emperor.temple_name}</span>
            <span className="dynasty">{emperor.dynasty}朝</span>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-grid">
            <div className="detail-item">
              <label>出生日期</label>
              <span>{emperor.birth_date}</span>
            </div>
            <div className="detail-item">
              <label>死亡日期</label>
              <span>{emperor.death_date}</span>
            </div>
            <div className="detail-item">
              <label>享年</label>
              <span className="death-age">{emperor.death_age} 岁</span>
            </div>
          </div>
        </div>

        <div className="summary-section">
          <h2>生平概述</h2>
          <p>{emperor.summary}</p>
        </div>

        <div className="achievements-section">
          <h2>成就时间轴</h2>
          <AchievementTimeline achievements={emperor.achievements} />
        </div>

        {emperor.sources.length > 0 && (
          <div className="sources-section">
            <h2>数据来源</h2>
            <ul className="sources-list">
              {emperor.sources.map((source, index) => (
                <li key={index}>
                  {source.url ? (
                    <a href={source.url} target="_blank" rel="noopener noreferrer">
                      {source.title}
                    </a>
                  ) : (
                    <span>{source.title}</span>
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