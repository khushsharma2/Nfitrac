import React, { useState, useMemo } from 'react';

interface LeaderboardProps {
  users: {
    id: number;
    name: string;
    totalCalories: number;
  }[];
  currentUserId?: number;
  onUserUpdate?: (updatedUser: { id: number; name: string; totalCalories: number }) => void;
  darkMode?: boolean;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ users, currentUserId, onUserUpdate, darkMode = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => b.totalCalories - a.totalCalories);
  }, [filteredUsers]);

  
  const getRankBadge = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  
  const getRankColor = (rank: number) => {
    if (rank === 1) return '#FFD700';
    if (rank === 2) return '#C0C0C0';
    if (rank === 3) return '#CD7F32';
    return '#6a1b9a';
  };
  const getProgressWidth = (calories: number, maxCalories: number) => {
    if (maxCalories === 0) return 0;
    return (calories / maxCalories) * 100;
  };

  const maxCalories = sortedUsers.length > 0 ? sortedUsers[0].totalCalories : 0;
  const totalCaloriesSum = users.reduce((sum, user) => sum + user.totalCalories, 0);

  return (
    <div style={{ padding: '20px', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ fontSize: '28px', marginRight: '12px' }}>🏆</div>
          <div>
            <h3 style={{ margin: '0 0 4px 0', color: darkMode ? '#ffffff' : '#2d3748', fontSize: '24px', fontWeight: '700' }}>
              Leaderboard
            </h3>
            <p style={{ margin: 0, color: darkMode ? '#ffffff' : '#718096', fontSize: '14px' }}>
              Top fitness achievers this month
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setViewMode('cards')}
            style={{
              padding: '8px 16px',
              border: viewMode === 'cards' ? '2px solid #4299e1' : darkMode ? '1px solid #333333' : '1px solid #e2e8f0',
              borderRadius: '6px',
              backgroundColor: viewMode === 'cards' ? '#ebf8ff' : darkMode ? '#000000' : '#ffffff',
              color: darkMode ? '#ffffff' : '#000000',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            📊 Cards
          </button>
          <button
            onClick={() => setViewMode('table')}
            style={{
              padding: '8px 16px',
              border: viewMode === 'table' ? '2px solid #4299e1' : darkMode ? '1px solid #333333' : '1px solid #e2e8f0',
              borderRadius: '6px',
              backgroundColor: viewMode === 'table' ? '#ebf8ff' : darkMode ? '#000000' : '#ffffff',
              color: darkMode ? '#ffffff' : '#000000',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            📋 Table
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="🔍 Search users..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: darkMode ? '1px solid #333333' : '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
            backgroundColor: darkMode ? '#000000' : '#ffffff',
            color: darkMode ? '#ffffff' : '#000000'
          }}
        />
      </div>

      {/* Stats Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: darkMode ? '#000000' : '#f8fafc', padding: '16px', borderRadius: '8px', border: darkMode ? '1px solid #333333' : '1px solid #e2e8f0', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: darkMode ? '#ffffff' : '#2d3748' }}>{users.length}</div>
          <div style={{ fontSize: '12px', color: darkMode ? '#ffffff' : '#718096', marginTop: '4px' }}>Total Users</div>
        </div>
        <div style={{ backgroundColor: darkMode ? '#000000' : '#f8fafc', padding: '16px', borderRadius: '8px', border: darkMode ? '1px solid #333333' : '1px solid #e2e8f0', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: darkMode ? '#ffffff' : '#48bb78' }}>{totalCaloriesSum.toLocaleString()}</div>
          <div style={{ fontSize: '12px', color: darkMode ? '#ffffff' : '#718096', marginTop: '4px' }}>Total Calories</div>
        </div>
        <div style={{ backgroundColor: darkMode ? '#000000' : '#f8fafc', padding: '16px', borderRadius: '8px', border: darkMode ? '1px solid #333333' : '1px solid #e2e8f0', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: darkMode ? '#ffffff' : '#4299e1' }}>
            {users.length > 0 ? Math.round(totalCaloriesSum / users.length) : 0}
          </div>
          <div style={{ fontSize: '12px', color: darkMode ? '#ffffff' : '#718096', marginTop: '4px' }}>Avg per User</div>
        </div>
      </div>

      {/*  leaderboard*/}
      {viewMode === 'cards' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {sortedUsers.map((user, index) => {
            const rank = index + 1;
            const isCurrentUser = user.id === currentUserId;
            const progressWidth = getProgressWidth(user.totalCalories, maxCalories);

            return (
                <div
                  key={user.id}
                  style={{
                    backgroundColor: darkMode ? '#000000' : (isCurrentUser ? '#fef5e7' : '#ffffff'),
                    border: darkMode ? '1px solid #333333' : (isCurrentUser ? '2px solid #f6ad55' : '1px solid #e2e8f0'),
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        fontSize: '24px',
                        color: darkMode ? '#ffffff' : getRankColor(rank),
                        fontWeight: '700',
                        minWidth: '40px'
                      }}>
                        {getRankBadge(rank)}
                      </div>
                      <div>
                        <div style={{
                          fontSize: '18px',
                          fontWeight: '600',
                          color: darkMode ? '#ffffff' : '#2d3748',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          {user.name}
                          {isCurrentUser && (
                            <span style={{
                              backgroundColor: darkMode ? '#333333' : '#f6ad55',
                              color: '#ffffff',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '12px',
                              fontWeight: '600'
                            }}>
                              YOU
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '14px', color: darkMode ? '#ffffff' : '#718096', marginTop: '2px' }}>
                          Rank #{rank}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '24px', fontWeight: '700', color: darkMode ? '#ffffff' : '#48bb78' }}>
                        {user.totalCalories.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '12px', color: darkMode ? '#ffffff' : '#718096' }}>calories</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ marginTop: '16px' }}>
                    <div style={{
                      width: '100%',
                      height: '6px',
                      backgroundColor: darkMode ? '#333333' : '#e2e8f0',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div
                        style={{
                          width: `${progressWidth}%`,
                          height: '100%',
                          backgroundColor: darkMode ? '#ffffff' : (rank <= 3 ? getRankColor(rank) : '#48bb78'),
                          borderRadius: '3px',
                          transition: 'width 0.5s ease'
                        }}
                      />
                    </div>
                    <div style={{ fontSize: '12px', color: darkMode ? '#ffffff' : '#718096', marginTop: '4px', textAlign: 'right' }}>
                      {progressWidth.toFixed(0)}% of leader
                    </div>
                  </div>
                </div>
            );
          })}
        </div>
      ) : (
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: darkMode ? '#000000' : '#ffffff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)' }}>
            <thead>
              <tr style={{ backgroundColor: darkMode ? '#000000' : '#f8fafc' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: darkMode ? '#ffffff' : '#4a5568', borderBottom: darkMode ? '1px solid #333333' : '1px solid #e2e8f0' }}>Rank</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: darkMode ? '#ffffff' : '#4a5568', borderBottom: darkMode ? '1px solid #333333' : '1px solid #e2e8f0' }}>User</th>
                <th style={{ padding: '16px', textAlign: 'right', fontWeight: '600', color: darkMode ? '#ffffff' : '#4a5568', borderBottom: darkMode ? '1px solid #333333' : '1px solid #e2e8f0' }}>Calories</th>
                <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: darkMode ? '#ffffff' : '#4a5568', borderBottom: darkMode ? '1px solid #333333' : '1px solid #e2e8f0' }}>Progress</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user, index) => {
                const rank = index + 1;
                const isCurrentUser = user.id === currentUserId;
                const progressWidth = getProgressWidth(user.totalCalories, maxCalories);

                return (
                  <tr
                    key={user.id}
                    style={{
                      borderBottom: darkMode ? '1px solid #333333' : '1px solid #f1f5f9',
                      backgroundColor: darkMode ? '#000000' : (isCurrentUser ? '#fef5e7' : 'transparent'),
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <td style={{ padding: '16px', fontSize: '18px', fontWeight: '700', color: darkMode ? '#ffffff' : getRankColor(rank) }}>
                      {getRankBadge(rank)}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: '600', color: darkMode ? '#ffffff' : '#2d3748' }}>{user.name}</span>
                        {isCurrentUser && (
                          <span style={{
                            backgroundColor: darkMode ? '#333333' : '#f6ad55',
                            color: '#ffffff',
                            padding: '2px 6px',
                            borderRadius: '8px',
                            fontSize: '10px',
                            fontWeight: '600'
                          }}>
                            YOU
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right', fontWeight: '700', color: darkMode ? '#ffffff' : '#48bb78', fontSize: '16px' }}>
                      {user.totalCalories.toLocaleString()}
                    </td>
                    <td style={{ padding: '16px', width: '200px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          flex: '1',
                          height: '6px',
                          backgroundColor: darkMode ? '#333333' : '#e2e8f0',
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}>
                          <div
                            style={{
                              width: `${progressWidth}%`,
                              height: '100%',
                              backgroundColor: darkMode ? '#ffffff' : (rank <= 3 ? getRankColor(rank) : '#48bb78'),
                              borderRadius: '3px',
                              transition: 'width 0.5s ease'
                            }}
                          />
                        </div>
                        <span style={{ fontSize: '12px', color: darkMode ? '#ffffff' : '#718096', minWidth: '35px' }}>
                          {progressWidth.toFixed(0)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {sortedUsers.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: darkMode ? '#ffffff' : '#718096' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏃‍♀️</div>
          <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: darkMode ? '#ffffff' : '#000000' }}>No users found</div>
          <div style={{ color: darkMode ? '#ffffff' : '#000000' }}>Try adjusting your search terms</div>
        </div>
      )}
    </div>
  );
};
export default Leaderboard;

