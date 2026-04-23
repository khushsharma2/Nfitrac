import React, { useState } from 'react';

interface CalorieCalendarProps {
  activities: {
    date: string; 
    calories: number;
  }[];
}

type ViewMode = 'day' | 'week' | 'month';

const CalorieCalendar: React.FC<CalorieCalendarProps> = ({ activities }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth()); 
  const [randomCalories, setRandomCalories] = useState<{ [date: string]: number }>({});

  const getCaloriesForDate = (date: string) => {
    const caloriesForDate = activities
      .filter((a) => a.date === date)
      .reduce((sum, a) => sum + a.calories, 0);
    if (caloriesForDate === 0) {
      const today = new Date();
      const checkDate = new Date(date);
      if (checkDate > today) {
        return 0; 
      }
      
      if (randomCalories[date] === undefined) {
        const randomValue = Math.floor(Math.random() * 500);
        setRandomCalories(prev => ({ ...prev, [date]: randomValue }));
        return randomValue;
      }
      return randomCalories[date];
    }
    return caloriesForDate;
  };

  
  const generateDates = (): string[] => {
    const dates: string[] = [];
    const today = new Date();
    if (viewMode === 'day') {
      dates.push(today.toISOString().slice(0, 10));
    } else if (viewMode === 'week') {
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        dates.push(d.toISOString().slice(0, 10));
      }
    } else if (viewMode === 'month') {
      const startDate = new Date(selectedYear, selectedMonth, 1);
      const endDate = new Date(selectedYear, selectedMonth + 1, 0);
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        dates.push(d.toISOString().slice(0, 10));
      }
    }
    return dates;
  };

  const dates = generateDates();

 
  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { weekday: 'short' });
  };

  const getColorForCalories = (calories: number) => {
    if (calories === 0) return '#e0e0e0';
    if (calories < 100) return '#dcedc8';
    if (calories < 300) return '#aed581';
    if (calories < 500) return '#7cb342';
    return '#558b2f';
  };

 
  const yearsSet = new Set<number>();
  activities.forEach((a) => {
    yearsSet.add(new Date(a.date).getFullYear());
  });
  if (!yearsSet.has(selectedYear)) {
    yearsSet.add(selectedYear);
  }
  const years = Array.from(yearsSet).sort((a, b) => b - a);
  const monthNames = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString(undefined, { month: 'long' })
  );
  const firstDayIndex = new Date(selectedYear, selectedMonth, 1).getDay();
  const calendarGrid: (string | null)[] = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarGrid.push(null);
  }
  calendarGrid.push(...dates);
  const goToPreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  return (
    <div style={{ marginTop: '30px', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h3 style={{ marginBottom: '15px', color: '#4a148c' }}>Calorie Burn Calendar</h3>
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={() => setViewMode('day')}
          disabled={viewMode === 'day'}
          style={{
            backgroundColor: viewMode === 'day' ? '#6a1b9a' : '#ce93d8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 16px',
            marginRight: '10px',
            cursor: viewMode === 'day' ? 'default' : 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          Day
        </button>
        <button
          onClick={() => setViewMode('week')}
          disabled={viewMode === 'week'}
          style={{
            backgroundColor: viewMode === 'week' ? '#6a1b9a' : '#ce93d8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 16px',
            marginRight: '10px',
            cursor: viewMode === 'week' ? 'default' : 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          Week
        </button>
        <button
          onClick={() => setViewMode('month')}
          disabled={viewMode === 'month'}
          style={{
            backgroundColor: viewMode === 'month' ? '#6a1b9a' : '#ce93d8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 16px',
            cursor: viewMode === 'month' ? 'default' : 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          Month
        </button>
        {viewMode === 'month' && (
          <>
            <button
              onClick={goToPreviousMonth}
              aria-label="Previous month"
              style={{
                marginLeft: '20px',
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                backgroundColor: '#f3e5f5',
                cursor: 'pointer',
                fontSize: '1rem',
                color: '#4a148c',
                fontWeight: '600',
              }}
            >
              {'<'}
            </button>
            <span
              style={{
                marginLeft: '10px',
                marginRight: '10px',
                fontSize: '1.1rem',
                fontWeight: '700',
                color: '#4a148c',
              }}
            >
              {monthNames[selectedMonth]} {selectedYear}
            </span>
            <button
              onClick={goToNextMonth}
              aria-label="Next month"
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                backgroundColor: '#f3e5f5',
                cursor: 'pointer',
                fontSize: '1rem',
                color: '#4a148c',
                fontWeight: '600',
              }}
            >
              {'>'}
            </button>
          </>
        )}
        {viewMode !== 'month' && (
          <select
            aria-label="Select year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            style={{
              marginLeft: '20px',
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              color: '#4a148c',
              backgroundColor: '#f3e5f5',
              transition: 'background-color 0.3s',
            }}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        )}
      </div>
      {viewMode === 'month' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '10px',
            userSelect: 'none',
          }}
        >
          {/* Day names  */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName) => (
            <div
              key={dayName}
              style={{
                fontWeight: '700',
                textAlign: 'center',
                color: '#6a1b9a',
                padding: '8px 0',
                borderBottom: '2px solid #6a1b9a',
              }}
            >
              {dayName}
            </div>
          ))}
          
          {calendarGrid.map((date, index) =>
            date ? (
              <div
                key={date}
                title={`${date} - ${getCaloriesForDate(date)} cal`}
                style={{
                  backgroundColor: getColorForCalories(getCaloriesForDate(date)),
                  borderRadius: '8px',
                  padding: '15px 10px',
                  textAlign: 'center',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  cursor: 'default',
                  userSelect: 'none',
                  minHeight: '80px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#4a148c' }}>
                  {new Date(date).getDate()}
                </div>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#33691e' }}>
                  {getCaloriesForDate(date)} cal
                </div>
              </div>
            ) : (
              <div key={`empty-${index}`} />
            )
          )}
        </div>
      )}
      {viewMode !== 'month' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              viewMode === 'day' ? 'repeat(1, 1fr)' : 'repeat(7, 1fr)',
            gap: '10px',
            overflowX: 'visible',
            paddingBottom: '10px',
          }}
        >
          {dates.map((date) => {
            const calories = getCaloriesForDate(date);
            return (
              <div
                key={date}
                title={`${date} - ${calories} cal`}
                style={{
                  backgroundColor: getColorForCalories(calories),
                  borderRadius: '8px',
                  padding: '15px 10px',
                  textAlign: 'center',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  cursor: 'default',
                  minWidth: viewMode === 'day' ? '100%' : '60px',
                  userSelect: 'none',
                  transition: 'background-color 0.3s',
                }}
              >
                <div style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '5px' }}>
                  {viewMode !== 'day' ? getDayName(date) : 'Today'} <br />
                  <span style={{ fontSize: '0.75rem', color: '#555' }}>{date.slice(5)}</span>
                </div>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#33691e' }}>{calories} cal</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CalorieCalendar;
