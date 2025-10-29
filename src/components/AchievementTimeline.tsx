import { Achievement } from '../types/emperor'

interface AchievementTimelineProps {
  achievements: Achievement[]
}

function AchievementTimeline({ achievements }: AchievementTimelineProps) {
  // Sort achievements by age
  const sortedAchievements = [...achievements].sort((a, b) => a.age - b.age)

  return (
    <div className="achievement-timeline">
      <h3>成就时间轴</h3>
      <div className="timeline">
        {sortedAchievements.map((achievement, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <div className="timeline-age">{achievement.age}岁</div>
              <div className="timeline-event">{achievement.event}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AchievementTimeline