import React from 'react';
import { Activity } from './ActivityForm';

interface ActivityListProps {
  activities: Activity[];
  darkMode?: boolean;
}

const ActivityList: React.FC<ActivityListProps> = ({ activities, darkMode = false }) => {
  const formatDuration = (duration: number) => {
    if (duration < 1) {
      return `${Math.round(duration * 60)} sec`;
    } else {
      return `${duration.toFixed(1)} min`;
    }
  };

  return (
    <div>
      <h4 style={{ margin: '0 0 16px 0', color: darkMode ? '#ffffff' : '#2d3748', fontSize: '18px', fontWeight: '600' }}>Activity Log</h4>
      {activities.length === 0 ? (
        <p style={{ color: darkMode ? '#a0aec0' : '#718096', fontStyle: 'italic', textAlign: 'center', padding: '20px' }}>No activities logged yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {activities.map((activity) => (
            <div
              key={activity.id}
              style={{
                padding: '12px 16px',
                backgroundColor: darkMode ? '#000000' : '#ffffff',
                border: `1px solid ${darkMode ? '#333333' : '#e2e8f0'}`,
                borderRadius: '6px',
                boxShadow: darkMode ? '0 1px 3px rgba(255, 255, 255, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <span style={{ fontWeight: '600', color: darkMode ? '#ffffff' : '#2d3748', fontSize: '16px' }}>{activity.type}</span>
                <span style={{ color: darkMode ? '#a0aec0' : '#718096', fontSize: '14px', marginLeft: '8px' }}>
                  {formatDuration(activity.duration)}
                </span>
              </div>
              <div style={{ fontWeight: '600', color: darkMode ? '#b39ddb' : '#48bb78', fontSize: '16px' }}>
                {activity.calories} cal
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityList;
