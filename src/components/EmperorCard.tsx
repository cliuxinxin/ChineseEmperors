import React from 'react'
import { Emperor } from '../types/emperor'
import './EmperorCard.css'

interface EmperorCardProps {
  emperor: Emperor
  onClick: () => void
}

const EmperorCard: React.FC<EmperorCardProps> = ({ emperor, onClick }) => {
  return (
    <div className="emperor-card" onClick={onClick}>
      <div className="card-header">
        <h3 className="emperor-name">{emperor.name}</h3>
        <div className="emperor-titles">
          <span className="temple-name">{emperor.temple_name}</span>
          <span className="dynasty">{emperor.dynasty}朝</span>
        </div>
      </div>

      <div className="card-content">
        <div className="lifespan">
          <div className="lifespan-item">
            <span className="label">生卒：</span>
            <span className="value">
              {emperor.birth_date} - {emperor.death_date}
            </span>
          </div>
          <div className="lifespan-item">
            <span className="label">享年：</span>
            <span className="value age">{emperor.death_age} 岁</span>
          </div>
        </div>

        <div className="summary">
          {emperor.summary}
        </div>

        {emperor.achievements.length > 0 && (
          <div className="achievements-preview">
            <h4>主要成就</h4>
            <ul>
              {emperor.achievements.slice(0, 3).map((achievement, index) => (
                <li key={index}>
                  <span className="achievement-age">{achievement.age}岁：</span>
                  {achievement.event}
                </li>
              ))}
              {emperor.achievements.length > 3 && (
                <li className="more-achievements">
                  还有 {emperor.achievements.length - 3} 项成就...
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      <div className="card-footer">
        <button className="view-details-button">
          查看详情
        </button>
      </div>
    </div>
  )
}

export default EmperorCard