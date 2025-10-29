import React from 'react'
import { Achievement } from '../types/emperor'
import './AchievementTimeline.css'

interface AchievementTimelineProps {
  achievements: Achievement[]
}

const AchievementTimeline: React.FC<AchievementTimelineProps> = ({ achievements }) => {
  const sortedAchievements = [...achievements].sort((a, b) => a.age - b.age)

  if (sortedAchievements.length === 0) {
    return (
      <div className="no-achievements">
        <p>暂无成就记录</p>
      </div>
    )
  }

  return (
    <div className="achievement-timeline">
      {sortedAchievements.map((achievement, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-marker">
            <div className="marker-circle"></div>
            {index < sortedAchievements.length - 1 && <div className="timeline-line"></div>}
          </div>
          <div className="timeline-content">
            <div className="achievement-age">
              {achievement.age} 岁
            </div>
            <div className="achievement-event">
              {achievement.event}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AchievementTimeline