import express from 'express';
const router = express.Router();

let profiles: { [userId: number]: { name: string; age: number; goals: string } } = {};
router.get('/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const profile = profiles[userId];
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  res.json(profile);
});
router.put('/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const { name, age, goals } = req.body;
  profiles[userId] = { name, age, goals };
  res.json({ message: 'Profile updated', profile: profiles[userId] });
});
export default router;
// not using this make my work complicate :)