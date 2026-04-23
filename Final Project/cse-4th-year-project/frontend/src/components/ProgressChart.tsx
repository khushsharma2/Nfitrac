import React from 'react';

interface ProgressChartProps {
  activities: {
    id: number;
    type: string;
    duration: number;
    calories: number;
  }[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ activities }) => {
  const caloriesByType = activities.reduce((acc, activity) => {
    acc[activity.type] = (acc[activity.type] || 0) + activity.calories;
    return acc;
  }, {} as Record<string, number>);

  const types = Object.keys(caloriesByType);
  const maxCalories = Math.max(...Object.values(caloriesByType), 0);

  return (
    <div className="progress-chart">
      <h3>Calories Burned by Activity</h3>
      {types.length === 0 ? (
        <p>No activity data to display.</p>
      ) : (
        <ul>
          {types.map((type) => {
            const calories = caloriesByType[type];
            const barWidth = (calories / maxCalories) * 100;
            return (
              <li key={type} style={{ marginBottom: '8px' }}>
                <strong>{type}</strong>
                <div
                  style={{
                    background: '#4caf50',
                    height: '20px',
                    width: `${barWidth}%`,
                    borderRadius: '4px',
                    color: 'white',
                    textAlign: 'right',
                    paddingRight: '5px',
                  }}
                >
                  {calories} cal
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ProgressChart;
