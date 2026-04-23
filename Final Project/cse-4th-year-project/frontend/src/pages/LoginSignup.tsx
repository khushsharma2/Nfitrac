import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

interface LoginSignupProps {
  onLogin: () => void;
  onSignup: () => void;
}

const LoginSignup: React.FC<LoginSignupProps> = ({ onLogin, onSignup }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  const handleTabClick = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
  };

  return (
    <div style={{
      maxWidth: '450px',
      margin: '40px auto',
      padding: '30px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      borderRadius: '12px',
      backgroundColor: '#fff',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => handleTabClick('login')}
          style={{
            flex: 1,
            padding: '10px 0',
            border: 'none',
            borderBottom: activeTab === 'login' ? '3px solid #7b1fa2' : '3px solid transparent',
            backgroundColor: 'transparent',
            fontWeight: activeTab === 'login' ? 'bold' : 'normal',
            cursor: 'pointer',
            fontSize: '18px',
            color: activeTab === 'login' ? '#7b1fa2' : '#555'
          }}
        >
          Login
        </button>
        <button
          onClick={() => handleTabClick('signup')}
          style={{
            flex: 1,
            padding: '10px 0',
            border: 'none',
            borderBottom: activeTab === 'signup' ? '3px solid #7b1fa2' : '3px solid transparent',
            backgroundColor: 'transparent',
            fontWeight: activeTab === 'signup' ? 'bold' : 'normal',
            cursor: 'pointer',
            fontSize: '18px',
            color: activeTab === 'signup' ? '#7b1fa2' : '#555'
          }}
        >
          Sign Up
        </button>
      </div>
      {activeTab === 'login' ? <Login onLogin={onLogin} /> : <Signup onSignup={onSignup} />}
    </div>
  );
};

export default LoginSignup;
