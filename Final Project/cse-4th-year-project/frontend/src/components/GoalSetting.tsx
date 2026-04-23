import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface GoalSettingProps {
  onSetGoal: (goal: number) => void;
  currentGoal: number;
  currentProgress?: number; // calories burned
}
const GoalSetting: React.FC<GoalSettingProps> = ({ onSetGoal, currentGoal, currentProgress = 0 }) => {
  const { darkMode } = useTheme();
  const [goal, setGoal] = useState(currentGoal);
  const [customGoal, setCustomGoal] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const presetGoals = [
    { value: 500, label: 'Beginner', description: '500 cal/day' },
    { value: 1000, label: 'Intermediate', description: '1000 cal/day' },
    { value: 1500, label: 'Advanced', description: '1500 cal/day' },
    { value: 2000, label: 'Athlete', description: '2000 cal/day' },
  ];



  useEffect(() => {
    setGoal(currentGoal);
    setSelectedPreset(presetGoals.find(p => p.value === currentGoal)?.value || null);
  }, [currentGoal]);

  const handlePresetSelect = (presetValue: number) => {
    setGoal(presetValue);
    setSelectedPreset(presetValue);
    setCustomGoal('');
  };

  const handleCustomGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomGoal(value);
    const numValue = Number(value);
    if (!isNaN(numValue) && numValue > 0) {
      setGoal(numValue);
      setSelectedPreset(null);}};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal > 0) {
      onSetGoal(goal);}};

  const progressPercentage = currentGoal > 0 ? Math.min((currentProgress / currentGoal) * 100, 100) : 0;
  const isGoalAchieved = currentProgress >= currentGoal;

  return (<div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '24px', marginRight: '12px' }}>🎯</div>
        <div>
          <h3 style={{ margin: '0 0 4px 0', color: darkMode ? '#ffffff' : '#2d3748', fontSize: '20px', fontWeight: '600' }}>
            Fitness Goals
          </h3>
          <p style={{ margin: 0, color: darkMode ? '#d1d5db' : '#718096', fontSize: '14px' }}>
            Set your daily calorie burn target
          </p>
        </div>
      </div>

      
      {currentGoal > 0 && (
        <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: darkMode ? '#1a202c' : '#f8fafc', borderRadius: '8px', border: `1px solid ${darkMode ? '#2d3748' : '#e2e8f0'}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: '500', color: darkMode ? '#e2e8f0' : '#4a5568' }}>Today's Progress</span>
            <span style={{ fontSize: '14px', color: darkMode ? '#a0aec0' : '#718096' }}>
              {currentProgress} / {currentGoal} cal
            </span>
          </div>
          <div style={{ width: '100%', height: '8px', backgroundColor: darkMode ? '#2d3748' : '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${progressPercentage}%`,
                height: '100%',
                backgroundColor: isGoalAchieved ? '#48bb78' : '#4299e1',
                transition: 'width 0.3s ease',
                borderRadius: '4px'
              }}
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '8px' }}>
            <span style={{
              fontSize: '12px',
              color: isGoalAchieved ? '#38a169' : '#3182ce',
              fontWeight: '600'
            }}>
              {isGoalAchieved ? '🎉 Goal Achieved!' : `${progressPercentage.toFixed(0)}% Complete`}
            </span>
          </div>
        </div>
      )}

      {/* pre set goals */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: darkMode ? '#ffffff' : '#2d3748', fontSize: '16px', fontWeight: '600' }}>
          Choose a Goal Level
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '8px' }}>
          {presetGoals.map((preset) => (
            <button
              key={preset.value}
              onClick={() => handlePresetSelect(preset.value)}
              style={{
                padding: '12px 16px',
                border: selectedPreset === preset.value ? '2px solid #4299e1' : `1px solid ${darkMode ? '#4a5568' : '#e2e8f0'}`,
                borderRadius: '8px',
                backgroundColor: selectedPreset === preset.value ? (darkMode ? '#2d3748' : '#ebf8ff') : (darkMode ? '#1a202c' : '#ffffff'),
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s',
                boxShadow: selectedPreset === preset.value ? '0 2px 4px rgba(66, 153, 225, 0.2)' : 'none'
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#ffffff' : '#2d3748', marginBottom: '4px' }}>
                {preset.label}
              </div>
              <div style={{ fontSize: '12px', color: darkMode ? '#a0aec0' : '#718096' }}>
                {preset.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Goal */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: darkMode ? '#ffffff' : '#2d3748', fontSize: '16px', fontWeight: '600' }}>
          Or Set Custom Goal
        </h4>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="number"
            value={customGoal}
            onChange={handleCustomGoalChange}
            placeholder="Enter calories"
            min="1"
            style={{
              padding: '10px 12px',
              border: `1px solid ${darkMode ? '#4a5568' : '#d1d5db'}`,
              borderRadius: '6px',
              fontSize: '14px',
              flex: '1',
              backgroundColor: darkMode ? '#1a202c' : '#ffffff',
              color: darkMode ? '#ffffff' : '#000000'
            }}
          />
          <span style={{ color: darkMode ? '#a0aec0' : '#718096', fontSize: '14px' }}>calories</span>
          <button
            type="submit"
            disabled={goal <= 0}
            style={{
              padding: '10px 20px',
              backgroundColor: goal > 0 ? '#48bb78' : '#a0aec0',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: goal > 0 ? 'pointer' : 'not-allowed',
              transition: 'background-color 0.2s'
            }}
          >
            Set Goal
          </button>
        </form>
      </div>

      {/* Cur Goal Display */}
      {currentGoal > 0 && (
        <div style={{ padding: '12px', backgroundColor: darkMode ? '#1a202c' : '#f0fff4', border: `1px solid ${darkMode ? '#2d3748' : '#9ae6b4'}`, borderRadius: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '16px', marginRight: '8px' }}>🎯</span>
            <span style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#ffffff' : '#2d3748' }}>
              Current Goal: {currentGoal} calories per day
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalSetting;
