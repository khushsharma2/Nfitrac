import React, { useState } from 'react';

const fitnessTips = [
  "Take the stairs instead of the elevator.",
  "Drink plenty of water throughout the day.",
  "Stretch before and after workouts to prevent injury.",
  "Incorporate strength training into your routine.",
  "Get at least 7-8 hours of sleep for recovery.",
  "Maintain a balanced diet rich in protein and veggies.",
  "Set realistic fitness goals and track your progress.",
  "Warm up properly before exercising.",
  "Stay consistent, even on days you don't feel like it.",
  "Mix cardio and strength training for best results."
];

const FunGame: React.FC = () => {
  const [tipIndex, setTipIndex] = useState(0);

  const handleNextTip = () => {
    setTipIndex((prevIndex) => (prevIndex + 1) % fitnessTips.length);
  };

  return (
    <div style={{
      padding: '20px',
      borderRadius: '16px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      backgroundColor: '#f3e5f5',
      textAlign: 'center',
      marginTop: '20px',
    }}>
      <h3 style={{ color: '#4a148c' }}>Fitness Tip of the Moment</h3>
      <p style={{ fontWeight: '600', fontSize: '1.1rem', color: '#6a1b9a' }}>{fitnessTips[tipIndex]}</p>
      <button
        onClick={handleNextTip}
        style={{
          padding: '10px 20px',
          background: 'linear-gradient(90deg, #7b1fa2, #4a148c)',
          color: 'white',
          border: 'none',
          borderRadius: '16px',
          cursor: 'pointer',
          fontWeight: '700',
          fontSize: '1.1rem',
          transition: 'background-color 0.3s ease',
          marginTop: '10px',
        }}
      >
        Next Tip
      </button>
    </div>
  );
};

export default FunGame;
/* not using this */
