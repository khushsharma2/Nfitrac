import React, { useState, useEffect, useRef } from 'react';


const calorieRates: Record<string, number> = {
  Running: 10,
  Walking: 4,
  Cycling: 8,
  Swimming: 9,
  Yoga: 3,
  'Weight Training': 6,
  'HIIT Workout': 12,
  Jumping: 10,
  Dancing: 7,
  Default: 5,
};

interface StopwatchProps {
  onAddActivity: (activity: {
    id: number;
    type: string;
    duration: number;
    calories: number;
    date: string;
  }) => void;
  darkMode?: boolean;
}

const Stopwatch: React.FC<StopwatchProps> = ({ onAddActivity, darkMode = false }) => {
  const [selectedActivity, setSelectedActivity] = useState<string>('Running');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0); //  sec 
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    if (time > 0) {
      const durationMinutes = time / 60; //  min 
      const rate = calorieRates[selectedActivity] || calorieRates['Default'];
      const calories = Math.round(rate * durationMinutes);

      const activity = {
        id: Date.now(),
        type: selectedActivity,
        duration: durationMinutes,
        calories,
        date: new Date().toISOString().slice(0, 10),
      };

      onAddActivity(activity);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: darkMode ? '#1a202c' : '#f8fafc', borderRadius: '8px', border: darkMode ? '1px solid #2d3748' : '1px solid #e2e8f0' }}>
      <h4 style={{ margin: '0 0 16px 0', color: darkMode ? '#ffffff' : '#2d3748', fontSize: '18px', fontWeight: '600' }}>
        🏃‍♂️ Activity Stopwatch
      </h4>

      {/* Activity selection */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: darkMode ? '#ffffff' : '#4a5568' }}>
          Select Activity:
        </label>
        <select
          value={selectedActivity}
          onChange={(e) => setSelectedActivity(e.target.value)}
          disabled={isRunning}
          style={{
            width: '100%',
            padding: '10px 12px',
            border: `1px solid ${darkMode ? '#4a5568' : '#d1d5db'}`,
            borderRadius: '6px',
            fontSize: '14px',
            backgroundColor: darkMode ? '#2d3748' : '#ffffff',
            color: darkMode ? '#ffffff' : '#000000',
            cursor: isRunning ? 'not-allowed' : 'pointer',
          }}
        >
          {Object.keys(calorieRates).filter(key => key !== 'Default').map((activity) => (
            <option key={activity} value={activity}>
              {activity} ({calorieRates[activity]} cal/min)
            </option>
          ))}
        </select>
      </div>

      
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: isRunning ? '#48bb78' : darkMode ? '#ffffff' : '#2d3748',
            fontFamily: 'monospace',
            marginBottom: '8px',
          }}
        >
          {formatTime(time)}
        </div>
        <div style={{ fontSize: '14px', color: darkMode ? '#a0aec0' : '#718096' }}>
          {isRunning ? 'Running...' : time > 0 ? 'Paused' : 'Ready to start'}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        {!isRunning ? (
          <button
            onClick={handleStart}
            disabled={time > 0 && !isRunning ? false : false} //  start anytime k
            style={{
              padding: '12px 24px',
              backgroundColor: '#48bb78',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#38a169')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#48bb78')}
          >
            {time > 0 ? 'Resume' : 'Start'}
          </button>
        ) : (
          <button
            onClick={handleStop}
            style={{
              padding: '12px 24px',
              backgroundColor: '#f56565',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e53e3e')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f56565')}
          >
            Stop & Log
          </button>
        )}

        <button
          onClick={handleReset}
          disabled={isRunning}
          style={{
            padding: '12px 24px',
            backgroundColor: darkMode ? '#4a5568' : '#e2e8f0',
            color: darkMode ? '#ffffff' : '#4a5568',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => !isRunning && (e.currentTarget.style.backgroundColor = darkMode ? '#2d3748' : '#cbd5e0')}
          onMouseOut={(e) => !isRunning && (e.currentTarget.style.backgroundColor = darkMode ? '#4a5568' : '#e2e8f0')}
        >
          Reset
        </button>
      </div>

      {/* instruction */}
      <div style={{ marginTop: '16px', fontSize: '12px', color: darkMode ? '#a0aec0' : '#718096', textAlign: 'center' }}>
        Select an activity, start the timer, and stop to automatically log your workout with calorie calculation.
      </div>
    </div>
  );
};

export default Stopwatch;
