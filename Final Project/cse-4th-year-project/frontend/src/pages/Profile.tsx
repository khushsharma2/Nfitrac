import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface UserProfile {
  name: string;
  age: number | '';
  weightGoal: number | '';
  totalCalories: number;
}

interface Activity {
  date: string;
  calories: number;
}

interface ProfileProps {
  setProfileComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

const Profile: React.FC<ProfileProps> = ({ setProfileComplete }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [weightGoal, setWeightGoal] = useState<number | ''>('');
  const [activities, setActivities] = useState<Activity[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/api/profile/6')
      .then(res => {
        const profile = res.data;
        setName(profile.name || '');
        setAge(profile.age || '');
        setWeightGoal(profile.goals || '');
      })
      .catch(err => console.error('Failed to fetch profile', err));

    
    axios.get('http://localhost:4000/api/activity/6')
      .then(res => {
        const mapped = res.data.map((a: any) => ({ date: a.date, calories: a.calories }));
        setActivities(mapped);
      })
      .catch(err => console.error('Failed to fetch activities', err));
  }, []);

  const handleSaveProfile = () => {
    const profileData = {
      name,
      age,
      goals: weightGoal,
    };

    axios.put('http://localhost:4000/api/profile/6', profileData)
      .then(() => {
        alert('Profile saved!');
        setProfileComplete(true);
        navigate('/');
      })
      .catch(err => {
        alert('Failed to save profile');
        console.error(err);
      });
  };

  return (
    <div className="profile-container card" style={{ maxWidth: '500px', margin: 'auto', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#6a1b9a' }}>User Profile</h2>
      <div className="profile-form" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
          placeholder="Enter your age"
          min={0}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <label htmlFor="weightGoal">Weight Loss Goal (kg):</label>
        <input
          id="weightGoal"
          type="number"
          value={weightGoal}
          onChange={(e) => setWeightGoal(e.target.value === '' ? '' : Number(e.target.value))}
          placeholder="Enter your weight loss goal"
          min={0}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <button onClick={handleSaveProfile} className="save-button" style={{ backgroundColor: '#7b1fa2', color: 'white', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
