import React from 'react';
import { FaRunning, FaTint, FaFire, FaMedal } from 'react-icons/fa';

interface Achievement {
  id: number;
  title: string;
  description: string;
  achieved: boolean;
  icon: JSX.Element;
}

interface AchievementsProps {
  activitiesCount: number;
  hydrationGoalMet: boolean;
  caloriesBurned: number;
}

const Achievements: React.FC<AchievementsProps> = ({ activitiesCount, hydrationGoalMet, caloriesBurned }) => {
  const achievements: Achievement[] = [
    {
      id: 1,
      title: 'Getting Started',
      description: 'Log your first activity',
      achieved: activitiesCount > 0,
      icon: <FaRunning />,
    },
    {
      id: 2,
      title: 'Hydration Hero',
      description: 'Meet your daily hydration goal',
      achieved: hydrationGoalMet,
      icon: <FaTint />,
    },
    {
      id: 3,
      title: 'Calorie Burner',
      description: 'Burn 1000 calories',
      achieved: caloriesBurned >= 1000,
      icon: <FaFire />,
    },
    {
      id: 4,
      title: 'Fitness Enthusiast',
      description: 'Log 10 activities',
      achieved: activitiesCount >= 10,
      icon: <FaMedal />,
    },
  ];

  return (
    <div style={{
      backgroundColor: '#ede7f6',
      padding: '20px',
      borderRadius: '16px',
      boxShadow: '0 8px 24px rgba(103, 58, 183, 0.15)',
      marginTop: '30px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#311b92',
    }}>
      <h3>Achievements & Badges</h3>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {achievements.map((ach) => (
          <div key={ach.id} style={{
            flex: '1 1 150px',
            background: ach.achieved
              ? 'linear-gradient(135deg, #7e57c2, #ab47bc, #e040fb)'
              : 'linear-gradient(135deg, #b39ddb, #9575cd, #7e57c2)',
            color: 'white',
            borderRadius: '12px',
            padding: '15px',
            boxShadow: ach.achieved ? '0 6px 20px rgba(160, 71, 255, 0.7)' : 'none',
            textAlign: 'center',
            cursor: ach.achieved ? 'default' : 'not-allowed',
            opacity: ach.achieved ? 1 : 0.6,
            transition: 'all 0.3s ease',
          }}>
            <div style={{ fontSize: '2.5rem', filter: ach.achieved ? 'drop-shadow(0 0 6px #e040fb)' : 'none' }}>{ach.icon}</div>
            <h4 style={{ margin: '10px 0 5px' }}>{ach.title}</h4>
            <p style={{ fontSize: '0.9rem' }}>{ach.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
