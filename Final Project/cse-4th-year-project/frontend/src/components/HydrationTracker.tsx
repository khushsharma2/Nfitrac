import React, { useState, useEffect } from 'react';
import { FaPlus, FaUndo } from 'react-icons/fa';

const HydrationTracker: React.FC = () => {
  const [waterIntake, setWaterIntake] = useState(0);

  
  useEffect(() => {
    const storedIntake = localStorage.getItem('waterIntake');
    if (storedIntake) {
      setWaterIntake(parseInt(storedIntake, 10));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem('waterIntake', waterIntake.toString());
  }, [waterIntake]);

  const addGlass = () => {
    setWaterIntake((prev) => Math.min(prev + 1, goal));
  };

  const resetIntake = () => {
    setWaterIntake(0);
  };

  const goal = 8; // per day
  const progressPercent = (waterIntake / goal) * 100;

  return (
    <div style={{
      backgroundColor: '#f3e5f5',
      padding: '20px',
      borderRadius: '16px',
      boxShadow: '0 8px 24px rgba(106, 27, 154, 0.15)',
      marginTop: '30px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#4a148c',
    }}>
      <h3>Hydration Tracker</h3>
      <p>Glasses of water consumed today: <strong>{waterIntake}</strong> / {goal}</p>
      <div style={{
        height: '20px',
        width: '100%',
        backgroundColor: '#ddd',
        borderRadius: '10px',
        overflow: 'hidden',
        marginBottom: '15px',
      }}>
        <div style={{
          height: '100%',
          width: `${progressPercent}%`,
          backgroundColor: '#7b1fa2',
          transition: 'width 0.3s ease-in-out',
        }} />
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button
          onClick={addGlass}
          style={{
            backgroundColor: '#7b1fa2',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '10px 20px',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '1rem',
            transition: 'background-color 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <FaPlus /> Add Glass
        </button>
        <button
          onClick={resetIntake}
          style={{
            backgroundColor: '#4a148c',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '10px 20px',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '1rem',
            transition: 'background-color 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <FaUndo /> Reset
        </button>
      </div>
    </div>
  );
};

export default HydrationTracker;
