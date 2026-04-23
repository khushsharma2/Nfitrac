import express from 'express';
import { getUsers, saveUsers } from '../utils/userStore';

const router = express.Router();

// signup 
router.post('/signup', (req, res) => {
  console.log('Signup request received:', req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    console.log('Signup error: Email and password are required');
    return res.status(400).json({ error: 'Email and password are required' });
  }
  const users = getUsers();
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    console.log('Signup error: User already exists:', email);
    return res.status(409).json({ error: 'User already exists' });
  }
  const newUser = { id: users.length + 1, email, password };
  users.push(newUser);
  saveUsers(users);
  console.log('Signup successful for user:', email);
  res.status(201).json({ message: 'User created', userId: newUser.id });
});

// login
router.post('/login', (req, res) => {
  console.log('Login request received:', req.body);
  const { email, password } = req.body;
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    console.log('Login error: Invalid credentials for email:', email);
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  console.log('Login successful for user:', email);
  res.json({ message: 'Login successful', token: 'mock-token', userId: user.id });
});

export default router;
