import React, { useState } from 'react';

interface ActivityFormProps {
  onAddActivity: (activity: Activity) => void;
  darkMode?: boolean;
}

export interface Activity {
  id: number;
  type: string;
  duration: number; // in min
  calories: number;
  date?: string;
}

// calorie burn rate activity type (cal/min)
const calorieRates: Record<string, number> = {
  Running: 10,
  Walking: 4,
  Cycling: 8,
  Swimming: 9,
  Yoga: 3,
  Default: 5,
};

const ActivityForm: React.FC<ActivityFormProps> = ({ onAddActivity, darkMode = false }) => {
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState(0);

  const calculateCalories = (activityType: string, durationMinutes: number) => {
    const rate = calorieRates[activityType] || calorieRates['Default'];
    return rate * durationMinutes;
  };
  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newType = e.target.value;
    setType(newType);
    if (duration) {
      const cal = calculateCalories(newType, Number(duration));
      setCalories(cal); }
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDuration = e.target.value;
    setDuration(newDuration);
    if (type) {
      const cal = calculateCalories(type, Number(newDuration));
      setCalories(cal);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !duration) return;
     onAddActivity({
      id: Date.now(),
      type,
      duration: Number(duration),
      calories, });

    setType('');
    setDuration('');
    setCalories(0); };

  return (
    <div>
      <h4 style={{ margin: '0 0 16px 0', color: darkMode ? '#ffffff' : '#2d3748', fontSize: '18px', fontWeight: '600' }}>Log New Activity</h4>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '14px', fontWeight: '500', color: darkMode ? '#ffffff' : '#4a5568' }}>Activity Type:</label>
          <input
            type="text"
            value={type}
            onChange={handleTypeChange}
            placeholder="e.g. Running"
            required
            style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              backgroundColor: darkMode ? '#000000' : '#ffffff',
              color: darkMode ? '#ffffff' : '#000000'
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '14px', fontWeight: '500', color: darkMode ? '#ffffff' : '#4a5568' }}>Duration (minutes):</label>
          <input
            type="number"
            value={duration}
            onChange={handleDurationChange}
            placeholder="e.g. 30"
            required
            min="1"
            style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              backgroundColor: darkMode ? '#000000' : '#ffffff',
              color: darkMode ? '#ffffff' : '#000000'
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '14px', fontWeight: '500', color: darkMode ? '#ffffff' : '#4a5568' }}>Calories Burned:</label>
          <input
            type="number"
            value={calories}
            readOnly
            style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              backgroundColor: darkMode ? '#333333' : '#f7fafc',
              color: darkMode ? '#ffffff' : '#2d3748'
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 16px',
            backgroundColor: darkMode ? '#4a148c' : '#48bb78',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '8px',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = darkMode ? '#6a1b9a' : '#38a169'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = darkMode ? '#4a148c' : '#48bb78'}
        >
          Add Activity
        </button>
      </form>
    </div>
  );
};

export default ActivityForm;
