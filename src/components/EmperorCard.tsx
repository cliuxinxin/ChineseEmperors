import { Link } from 'react-router-dom'
import { Emperor } from '../types/emperor'

interface EmperorCardProps {
  emperor: Emperor
}

function EmperorCard({ emperor }: EmperorCardProps) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>
          <Link to={`/emperor/${emperor.id}`} style={{ textDecoration: 'none', color: '#333' }}>
            {emperor.name} ({emperor.temple_name})
          </Link>
        </h3>
        <span className="dynasty-badge">{emperor.dynasty}</span>
      </div>

      <div className="card-body">
        <p className="death-info">
          <strong>去世年龄：</strong>{emperor.death_age}岁
        </p>

        <p className="lifespan">
          <strong>生卒年份：</strong>{emperor.birth_date} - {emperor.death_date}
        </p>

        <p className="summary">{emperor.summary}</p>

        {emperor.achievements.length > 0 && (
          <div className="achievements-preview">
            <h4>主要成就：</h4>
            <ul>
              {emperor.achievements.slice(0, 3).map((achievement, index) => (
                <li key={index}>
                  <strong>{achievement.age}岁：</strong>{achievement.event}
                </li>
              ))}
              {emperor.achievements.length > 3 && (
                <li style={{ color: '#666', fontStyle: 'italic' }}>
                  ...还有{emperor.achievements.length - 3}项成就
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      <div className="card-footer">
        <Link to={`/emperor/${emperor.id}`} className="btn">
          查看详情
        </Link>
      </div>
    </div>
  )
}

export default EmperorCard