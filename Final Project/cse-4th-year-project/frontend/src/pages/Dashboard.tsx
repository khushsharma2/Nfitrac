
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import './Dashboard.css';
import ActivityForm, { Activity } from '../components/ActivityForm';
import ActivityList from '../components/ActivityList';
import Stopwatch from '../components/Stopwatch';

import Leaderboard from '../components/Leaderboard';
import GoalSetting from '../components/GoalSetting';
import CalorieCalendar from '../components/CalorieCalendar';
import FunGame from '../components/FunGame';
import MotivationalQuotes from '../components/MotivationalQuotes';
import HydrationTracker from '../components/HydrationTracker';
import Achievements from '../components/Achievements';

interface Meal {
  id: number;
  name: string;
  calories: number;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  protein?: number;
  carbs?: number;
  fat?: number;
  scheduled: boolean;
  timeSlot?: 'morning' | 'afternoon' | 'evening';
}

interface UserProfile {
  name: string;
  age: number | '';
  weightGoal: number | '';
  calorieIntake: number | '';
  totalCalories: number;
}

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const generateRandomActivities = (): Activity[] => {
    const activities: Activity[] = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      activities.push({
        id: i + 1,
        type: 'Random Activity',
        duration: Math.floor(Math.random() * 60) + 10,
        calories: Math.floor(Math.random() * 500) + 50,
        date: d.toISOString().slice(0, 10),
      });
    }
    return activities;
  };

  const [activities, setActivities] = useState<Activity[]>([]);
  const [goal, setGoal] = useState(500); 
  const [filter, setFilter] = useState('all');

  
  const filteredActivities = filter === 'all' ? activities : activities.filter(activity => activity.type === filter);

  const [meals, setMeals] = useState<Meal[]>([
    { id: 1, name: 'Oatmeal', calories: 150, category: 'breakfast', protein: 5, carbs: 27, fat: 3, scheduled: false },
    { id: 2, name: 'Grilled Chicken', calories: 350, category: 'lunch', protein: 45, carbs: 0, fat: 15, scheduled: false },
    { id: 3, name: 'Salad', calories: 200, category: 'dinner', protein: 8, carbs: 15, fat: 12, scheduled: false },
  ]);
  const [newMealName, setNewMealName] = useState('');
  const [newMealCalories, setNewMealCalories] = useState<number | ''>('');
  const { darkMode, toggleDarkMode } = useTheme();
  const [userProfiles, setUserProfiles] = React.useState<UserProfile[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const sampleUsers = [
      { name: 'Bob', age: 25, weightGoal: 3, calorieIntake: 1800, totalCalories: 1200 },
      { name: 'Charlie', age: 35, weightGoal: 4, calorieIntake: 2200, totalCalories: 1700 },
    ];
    localStorage.setItem('userProfiles', JSON.stringify(sampleUsers));
    setUserProfiles(sampleUsers);
  }, []);

  const activitiesWithDate = activities.map((activity) => ({
    date: activity.date || new Date().toISOString().slice(0, 10),
    calories: activity.calories,
  }));

  const handleAddActivity = (activity: Activity) => {
    const activityWithDate = {
      ...activity,
      date: activity.date || new Date().toISOString().slice(0, 10)
    };
    setActivities((prevActivities) => [activityWithDate, ...prevActivities]);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const handleSetGoal = (newGoal: number) => {
    setGoal(newGoal);
  };

  const handleMealCheckboxChange = (id: number, timeSlot: 'morning' | 'afternoon' | 'evening') => {
    setMeals((prevMeals) =>
      prevMeals.map((meal) =>
        meal.id === id ? { ...meal, timeSlot: meal.timeSlot === timeSlot ? undefined : timeSlot, scheduled: meal.timeSlot === timeSlot ? false : true } : meal
      )
    );
  };

  const handleAddMeal = () => {
    if (newMealName.trim() === '' || newMealCalories === '') return;
    const newMeal: Meal = {
      id: Date.now(),
      name: newMealName.trim(),
      calories: newMealCalories as number,
      category: 'snack',
      scheduled: false,
    };
    setMeals((prevMeals) => [...prevMeals, newMeal]);
    setNewMealName('');
    setNewMealCalories('');
  };

  const handleRemoveMeal = (id: number) => {
    setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== id));
  };

  
  const totalCalories = activities.reduce((sum, activity) => sum + activity.calories, 0);
  const currentUserId = 1; // Current user is always id 1
  const currentUserCalories = activities.reduce((sum, a) => sum + a.calories, 0);
  const users = [
    { id: 1, name: 'You', totalCalories: currentUserCalories },
    ...userProfiles.map((profile, index) => ({
      id: index + 2,
      name: profile.name,
      totalCalories: profile.totalCalories,
    }))
  ];

  const handleUserUpdate = (updatedUser: { id: number; name: string; totalCalories: number }) => {
    setUserProfiles((prevProfiles) =>
      prevProfiles.map((profile, index) =>
        index + 1 === updatedUser.id
          ? { ...profile, name: updatedUser.name, totalCalories: updatedUser.totalCalories }
          : profile
      )
    );
  };

  return (
    <div className={`app-container${darkMode ? ' dark-mode' : ''}`}>
      <nav className="nav">
        <h1>Nfitrac</h1>
        <div className="nav-right">
          <span>Welcome back!</span>
          <button
            onClick={toggleDarkMode}
            aria-pressed={darkMode}
            aria-label="Toggle dark mode"
            style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              color: '#000000',
              border: '1px solid #000000',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f0f0';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <span>{darkMode ? '☀️' : '🌙'}</span>
            Dark Mode
          </button>
          <button onClick={handleLogout} className="logout-button" aria-label="Logout">
            <span>🚪</span>
            Logout
          </button>
        </div>
      </nav>
      <main style={{ padding: '24px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '800', color: darkMode ? '#ffffff' : '#1a202c' }}>Dashboard</h2>
          <p style={{ margin: 0, fontSize: '16px', color: darkMode ? '#ffffff' : '#718096' }}>Track your fitness progress and stay motivated</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          <div className="card" style={{ background: darkMode ? '#000000' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#ffffff' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Total Calories Burned</h3>
            <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>{totalCalories}</p>
          </div>
          <div className="card" style={{ background: darkMode ? '#000000' : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: '#ffffff' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Activities Completed</h3>
            <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>{activities.length}</p>
          </div>
          <div className="card" style={{ background: darkMode ? '#000000' : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: '#ffffff' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Goal Progress</h3>
            <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>{Math.min((totalCalories / goal) * 100, 100).toFixed(0)}%</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
          <div className="card" style={{ gridColumn: 'span 2' }}>
          <GoalSetting onSetGoal={handleSetGoal} currentGoal={goal} currentProgress={totalCalories} />
          </div>
          <div className="card">
            <CalorieCalendar activities={activitiesWithDate} />
          </div>
          <div className="card">
            <h3 style={{ marginBottom: '20px', color: darkMode ? '#ffffff' : '#2d3748', fontSize: '20px', fontWeight: '600' }}>Activities</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Stopwatch onAddActivity={handleAddActivity} darkMode={darkMode} />
              <div style={{ padding: '20px', backgroundColor: darkMode ? '#000000' : '#f8fafc', borderRadius: '8px', border: darkMode ? '1px solid #333333' : '1px solid #e2e8f0' }}>
            <ActivityForm onAddActivity={handleAddActivity} darkMode={darkMode} />
              </div>
              <div style={{ padding: '20px', backgroundColor: darkMode ? '#000000' : '#f8fafc', borderRadius: '8px', border: darkMode ? '1px solid #333333' : '1px solid #e2e8f0', maxHeight: '400px', overflowY: 'auto' }}>
                <ActivityList activities={filteredActivities} darkMode={darkMode} />
              </div>
            </div>
          </div>
          <div className="card" style={{ gridColumn: 'span 2' }}>
          <Leaderboard users={users} currentUserId={currentUserId} darkMode={darkMode} />
          </div>
          <div className="card diet-plan" style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: darkMode ? '#ffffff' : '#2d3748', fontSize: '24px', fontWeight: '700' }}>🍽️ Nutrition Tracker</h3>
              <div style={{ fontSize: '14px', color: darkMode ? '#ffffff' : '#718096' }}>
                Daily Goal: 2,000 cal
              </div>
            </div>

            {/* Add meals */}
            <div style={{ backgroundColor: darkMode ? '#000000' : '#f8fafc', padding: '16px', borderRadius: '8px', marginBottom: '20px', border: darkMode ? '1px solid #333333' : '1px solid #e2e8f0' }}>
              <h4 style={{ margin: '0 0 12px 0', color: darkMode ? '#ffffff' : '#2d3748', fontSize: '16px', fontWeight: '600' }}>Add New Meal</h4>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  value={newMealName}
                  onChange={(e) => setNewMealName(e.target.value)}
                  placeholder="Meal name"
                  style={{ flex: '1', minWidth: '200px', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px' }}
                />
                <input
                  type="number"
                  value={newMealCalories}
                  onChange={(e) => setNewMealCalories(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Calories"
                  min={0}
                  style={{ width: '100px', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px' }}
                />
                <button
                  onClick={handleAddMeal}
                  disabled={!newMealName.trim() || newMealCalories === ''}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: newMealName.trim() && newMealCalories !== '' ? '#48bb78' : '#a0aec0',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: newMealName.trim() && newMealCalories !== '' ? 'pointer' : 'not-allowed',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  ➕ Add Meal
                </button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              <div style={{ background: darkMode ? '#000000' : 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%)', padding: '16px', borderRadius: '8px', color: darkMode ? '#ffffff' : '#92400e' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>🌅 Breakfast</h4>
                  <span style={{ fontSize: '12px', backgroundColor: darkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)', color: darkMode ? '#ffffff' : '#000000', padding: '2px 8px', borderRadius: '12px' }}>7-9 AM</span>
                </div>
                <div style={{ minHeight: '100px', marginBottom: '12px' }}>
                  {meals.filter(meal => meal.category === 'breakfast' && meal.scheduled && meal.timeSlot === 'morning').map(meal => (
                    <div key={meal.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', backgroundColor: darkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.9)', padding: '10px', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', fontSize: '14px', color: darkMode ? '#ffffff' : '#000000' }}>{meal.name}</div>
                        <div style={{ fontSize: '11px', color: darkMode ? '#ffffff' : '#92400e', display: 'flex', gap: '8px' }}>
                          <span>{meal.calories} cal</span>
                          {meal.protein && <span>P:{meal.protein}g</span>}
                          {meal.carbs && <span>C:{meal.carbs}g</span>}
                          {meal.fat && <span>F:{meal.fat}g</span>}
                        </div>
                      </div>
                      <button onClick={() => handleRemoveMeal(meal.id)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '16px', padding: '4px' }}>×</button>
                    </div>
                  ))}
                  {meals.filter(meal => meal.category === 'breakfast' && meal.scheduled && meal.timeSlot === 'morning').length === 0 && (
                    <div style={{ color: darkMode ? '#ffffff' : '#a16207', fontStyle: 'italic', textAlign: 'center', padding: '20px' }}>No breakfast planned</div>
                  )}
                </div>
                {/*  Add Breakfast */}
                <div style={{ borderTop: darkMode ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(146,64,14,0.2)', paddingTop: '12px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: darkMode ? '#ffffff' : '#92400e' }}>Quick Add:</div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {[
                      { name: 'Oatmeal', calories: 150, protein: 5, carbs: 27, fat: 3 },
                      { name: 'Eggs', calories: 140, protein: 12, carbs: 1, fat: 10 },
                      { name: 'Toast', calories: 80, protein: 3, carbs: 15, fat: 1 },
                      { name: 'Fruit', calories: 60, protein: 1, carbs: 15, fat: 0 }
                    ].map((quickMeal, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const newMeal: Meal = {
                            id: Date.now() + index,
                            name: quickMeal.name,
                            calories: quickMeal.calories,
                            category: 'breakfast',
                            protein: quickMeal.protein,
                            carbs: quickMeal.carbs,
                            fat: quickMeal.fat,
                            scheduled: true,
                            timeSlot: 'morning'
                          };
                          setMeals(prev => [...prev, newMeal]);
                        }}
                        style={{
                          padding: '6px 10px',
                          backgroundColor: darkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
                          color: darkMode ? '#ffffff' : '#92400e',
                          border: darkMode ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(146,64,14,0.3)',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '11px',
                          fontWeight: '500'
                        }}
                      >
                        + {quickMeal.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lunch */}
              <div style={{ background: darkMode ? '#000000' : 'linear-gradient(135deg, #dbeafe 0%, #3b82f6 100%)', padding: '16px', borderRadius: '8px', color: darkMode ? '#ffffff' : '#1e40af' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>☀️ Lunch</h4>
                  <span style={{ fontSize: '12px', backgroundColor: darkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)', color: darkMode ? '#ffffff' : '#000000', padding: '2px 8px', borderRadius: '12px' }}>12-2 PM</span>
                </div>
                <div style={{ minHeight: '100px', marginBottom: '12px' }}>
                  {meals.filter(meal => meal.category === 'lunch' && meal.scheduled && meal.timeSlot === 'afternoon').map(meal => (
                    <div key={meal.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', backgroundColor: darkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.9)', padding: '10px', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', fontSize: '14px', color: darkMode ? '#ffffff' : '#000000' }}>{meal.name}</div>
                        <div style={{ fontSize: '11px', color: darkMode ? '#ffffff' : '#1e40af', display: 'flex', gap: '8px' }}>
                          <span>{meal.calories} cal</span>
                          {meal.protein && <span>P:{meal.protein}g</span>}
                          {meal.carbs && <span>C:{meal.carbs}g</span>}
                          {meal.fat && <span>F:{meal.fat}g</span>}
                        </div>
                      </div>
                      <button onClick={() => handleRemoveMeal(meal.id)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '16px', padding: '4px' }}>×</button>
                    </div>
                  ))}
                  {meals.filter(meal => meal.category === 'lunch' && meal.scheduled && meal.timeSlot === 'afternoon').length === 0 && (
                    <div style={{ color: darkMode ? '#ffffff' : '#1e3a8a', fontStyle: 'italic', textAlign: 'center', padding: '20px' }}>No lunch planned</div>
                  )}
                </div>
                {/* for adding Lunch */}
                <div style={{ borderTop: darkMode ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(30,64,175,0.2)', paddingTop: '12px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: darkMode ? '#ffffff' : '#1e40af' }}>Quick Add:</div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {[
                      { name: 'Grilled Chicken', calories: 350, protein: 45, carbs: 0, fat: 15 },
                      { name: 'Salad', calories: 200, protein: 8, carbs: 15, fat: 12 },
                      { name: 'Rice', calories: 130, protein: 3, carbs: 28, fat: 0 },
                      { name: 'Soup', calories: 120, protein: 6, carbs: 12, fat: 4 }
                    ].map((quickMeal, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const newMeal: Meal = {
                            id: Date.now() + index + 10,
                            name: quickMeal.name,
                            calories: quickMeal.calories,
                            category: 'lunch',
                            protein: quickMeal.protein,
                            carbs: quickMeal.carbs,
                            fat: quickMeal.fat,
                            scheduled: true,
                            timeSlot: 'afternoon'
                          };
                          setMeals(prev => [...prev, newMeal]);
                        }}
                        style={{
                          padding: '6px 10px',
                          backgroundColor: darkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
                          color: darkMode ? '#ffffff' : '#1e40af',
                          border: darkMode ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(30,64,175,0.3)',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '11px',
                          fontWeight: '500'
                        }}
                      >
                        + {quickMeal.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dinner */}
              <div style={{ background: darkMode ? '#000000' : 'linear-gradient(135deg, #e9d5ff 0%, #8b5cf6 100%)', padding: '16px', borderRadius: '8px', color: darkMode ? '#ffffff' : '#5b21b6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>🌙 Dinner</h4>
                  <span style={{ fontSize: '12px', backgroundColor: darkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)', color: darkMode ? '#ffffff' : '#000000', padding: '2px 8px', borderRadius: '12px' }}>6-8 PM</span>
                </div>
                <div style={{ minHeight: '100px', marginBottom: '12px' }}>
                  {meals.filter(meal => meal.category === 'dinner' && meal.scheduled && meal.timeSlot === 'evening').map(meal => (
                    <div key={meal.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', backgroundColor: darkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.9)', padding: '10px', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', fontSize: '14px', color: darkMode ? '#ffffff' : '#000000' }}>{meal.name}</div>
                        <div style={{ fontSize: '11px', color: darkMode ? '#ffffff' : '#5b21b6', display: 'flex', gap: '8px' }}>
                          <span>{meal.calories} cal</span>
                          {meal.protein && <span>P:{meal.protein}g</span>}
                          {meal.carbs && <span>C:{meal.carbs}g</span>}
                          {meal.fat && <span>F:{meal.fat}g</span>}
                        </div>
                      </div>
                      <button onClick={() => handleRemoveMeal(meal.id)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '16px', padding: '4px' }}>×</button>
                    </div>
                  ))}
                  {meals.filter(meal => meal.category === 'dinner' && meal.scheduled && meal.timeSlot === 'evening').length === 0 && (
                    <div style={{ color: darkMode ? '#ffffff' : '#581c87', fontStyle: 'italic', textAlign: 'center', padding: '20px' }}>No dinner planned</div>
                  )}
                </div>
                {/*  for dinner */}
                <div style={{ borderTop: darkMode ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(91,33,182,0.2)', paddingTop: '12px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: darkMode ? '#ffffff' : '#5b21b6' }}>Quick Add:</div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {[
                      { name: 'Fish', calories: 280, protein: 35, carbs: 0, fat: 12 },
                      { name: 'Vegetables', calories: 80, protein: 3, carbs: 12, fat: 1 },
                      { name: 'Pasta', calories: 220, protein: 8, carbs: 40, fat: 2 },
                      { name: 'Yogurt', calories: 100, protein: 10, carbs: 12, fat: 2 }
                    ].map((quickMeal, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const newMeal: Meal = {
                            id: Date.now() + index + 20,
                            name: quickMeal.name,
                            calories: quickMeal.calories,
                            category: 'dinner',
                            protein: quickMeal.protein,
                            carbs: quickMeal.carbs,
                            fat: quickMeal.fat,
                            scheduled: true,
                            timeSlot: 'evening'
                          };
                          setMeals(prev => [...prev, newMeal]);
                        }}
                        style={{
                          padding: '6px 10px',
                          backgroundColor: darkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
                          color: darkMode ? '#ffffff' : '#5b21b6',
                          border: darkMode ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(91,33,182,0.3)',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '11px',
                          fontWeight: '500'
                        }}
                      >
                        + {quickMeal.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Snacks */}
              <div style={{ background: darkMode ? '#000000' : 'linear-gradient(135deg, #fce7f3 0%, #ec4899 100%)', padding: '16px', borderRadius: '8px', color: darkMode ? '#ffffff' : '#be185d' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>🍿 Snacks</h4>
                  <span style={{ fontSize: '12px', backgroundColor: darkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)', color: darkMode ? '#ffffff' : '#000000', padding: '2px 8px', borderRadius: '12px' }}>Anytime</span>
                </div>
                <div style={{ minHeight: '100px', marginBottom: '12px' }}>
                  {meals.filter(meal => meal.category === 'snack').map(meal => (
                    <div key={meal.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', backgroundColor: darkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.9)', padding: '10px', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', fontSize: '14px', color: darkMode ? '#ffffff' : '#000000' }}>{meal.name}</div>
                        <div style={{ fontSize: '11px', color: darkMode ? '#ffffff' : '#be185d', display: 'flex', gap: '8px' }}>
                          <span>{meal.calories} cal</span>
                          {meal.protein && <span>P:{meal.protein}g</span>}
                          {meal.carbs && <span>C:{meal.carbs}g</span>}
                          {meal.fat && <span>F:{meal.fat}g</span>}
                        </div>
                      </div>
                      <button onClick={() => handleRemoveMeal(meal.id)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '16px', padding: '4px' }}>×</button>
                    </div>
                  ))}
                  {meals.filter(meal => meal.category === 'snack').length === 0 && (
                    <div style={{ color: darkMode ? '#ffffff' : '#9d174d', fontStyle: 'italic', textAlign: 'center', padding: '20px' }}>No snacks added</div>
                  )}
                </div>
                {/* snackies */}
                <div style={{ borderTop: darkMode ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(190,24,93,0.2)', paddingTop: '12px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: darkMode ? '#ffffff' : '#be185d' }}>Quick Add:</div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {[
                      { name: 'Apple', calories: 80, protein: 0, carbs: 22, fat: 0 },
                      { name: 'Nuts', calories: 160, protein: 6, carbs: 6, fat: 14 },
                      { name: 'Chocolate', calories: 120, protein: 2, carbs: 15, fat: 8 },
                      { name: 'Protein Bar', calories: 200, protein: 20, carbs: 20, fat: 5 }
                    ].map((quickMeal, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const newMeal: Meal = {
                            id: Date.now() + index + 30,
                            name: quickMeal.name,
                            calories: quickMeal.calories,
                            category: 'snack',
                            protein: quickMeal.protein,
                            carbs: quickMeal.carbs,
                            fat: quickMeal.fat,
                            scheduled: false
                          };
                          setMeals(prev => [...prev, newMeal]);
                        }}
                        style={{
                          padding: '6px 10px',
                          backgroundColor: darkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
                          color: darkMode ? '#ffffff' : '#be185d',
                          border: darkMode ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(190,24,93,0.3)',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '11px',
                          fontWeight: '500'
                        }}
                      >
                        + {quickMeal.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: darkMode ? '#000000' : '#f8fafc', padding: '16px', borderRadius: '8px', border: darkMode ? '1px solid #333333' : '1px solid #e2e8f0' }}>
              <h4 style={{ margin: '0 0 12px 0', color: darkMode ? '#ffffff' : '#2d3748', fontSize: '16px', fontWeight: '600' }}>📚 Meal Library</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                {meals.filter(meal => !meal.scheduled).map(meal => (
                  <div key={meal.id} style={{ backgroundColor: darkMode ? '#000000' : '#fff', padding: '12px', borderRadius: '6px', border: darkMode ? '1px solid #333333' : '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '14px', color: darkMode ? '#ffffff' : '#000000' }}>{meal.name}</div>
                      <div style={{ fontSize: '12px', color: darkMode ? '#ffffff' : '#718096' }}>{meal.calories} cal • {meal.category}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button
                        onClick={() => handleMealCheckboxChange(meal.id, 'morning')}
                        style={{ padding: '4px 8px', backgroundColor: '#000000', color: '#ffffff', border: '1px solid #333333', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                      >
                        🌅
                      </button>
                      <button
                        onClick={() => handleMealCheckboxChange(meal.id, 'afternoon')}
                        style={{ padding: '4px 8px', backgroundColor: '#000000', color: '#ffffff', border: '1px solid #333333', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                      >
                        ☀️
                      </button>
                      <button
                        onClick={() => handleMealCheckboxChange(meal.id, 'evening')}
                        style={{ padding: '4px 8px', backgroundColor: '#000000', color: '#ffffff', border: '1px solid #333333', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                      >
                        🌙
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nutrition summary */}
            <div style={{ marginTop: '20px', padding: '16px', backgroundColor: darkMode ? '#000000' : '#f0f9ff', borderRadius: '8px', border: darkMode ? '1px solid #333333' : '1px solid #bae6fd' }}>
              <h4 style={{ margin: '0 0 12px 0', color: darkMode ? '#ffffff' : '#0c4a6e', fontSize: '18px', fontWeight: '600' }}>📊 Daily Nutrition Summary</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: darkMode ? '#ffffff' : '#0369a1' }}>
                    {meals.filter(meal => meal.scheduled).reduce((total, meal) => total + meal.calories, 0)}
                  </div>
                  <div style={{ fontSize: '12px', color: darkMode ? '#ffffff' : '#0369a1' }}>Calories</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: darkMode ? '#ffffff' : '#059669' }}>
                    {meals.filter(meal => meal.scheduled).reduce((total, meal) => total + (meal.protein || 0), 0)}g
                  </div>
                  <div style={{ fontSize: '12px', color: darkMode ? '#ffffff' : '#059669' }}>Protein</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: darkMode ? '#ffffff' : '#dc2626' }}>
                    {meals.filter(meal => meal.scheduled).reduce((total, meal) => total + (meal.carbs || 0), 0)}g
                  </div>
                  <div style={{ fontSize: '12px', color: darkMode ? '#ffffff' : '#dc2626' }}>Carbs</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: darkMode ? '#ffffff' : '#7c3aed' }}>
                    {meals.filter(meal => meal.scheduled).reduce((total, meal) => total + (meal.fat || 0), 0)}g
                  </div>
                  <div style={{ fontSize: '12px', color: darkMode ? '#ffffff' : '#7c3aed' }}>Fat</div>
                </div>
              </div>
              <div style={{ marginTop: '12px', height: '8px', backgroundColor: darkMode ? '#333333' : '#e0f2fe', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${Math.min((meals.filter(meal => meal.scheduled).reduce((total, meal) => total + meal.calories, 0) / 2000) * 100, 100)}%`,
                    height: '100%',
                    backgroundColor: darkMode ? '#ffffff' : '#0369a1',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
              <div style={{ marginTop: '4px', fontSize: '12px', color: darkMode ? '#ffffff' : '#0369a1', textAlign: 'center' }}>
                {Math.min((meals.filter(meal => meal.scheduled).reduce((total, meal) => total + meal.calories, 0) / 2000) * 100, 100).toFixed(0)}% of daily goal
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
