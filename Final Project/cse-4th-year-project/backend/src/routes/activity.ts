import express from 'express';

const router = express.Router();


let activities: { [userId: number]: Array<{ id: number; type: string; duration: number; date: string; calories: number }> } = {};
router.get('/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const userActivities = activities[userId] || [];
  res.json(userActivities);
});
router.post('/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const { type, duration, date, calories } = req.body;
  if (!activities[userId]) {
    activities[userId] = [];
  }
  const newActivity = {
    id: activities[userId].length + 1,
    type,
    duration,
    date,
    calories,
  };
  activities[userId].push(newActivity);
  res.status(201).json({ message: 'Activity added', activity: newActivity });
});
activities[6] = [
  { id: 1, type: 'Running', duration: 30, date: '2025-07-18', calories: 300 },
  { id: 2, type: 'Cycling', duration: 45, date: '2025-07-17', calories: 450 },
  { id: 3, type: 'Swimming', duration: 60, date: '2025-07-16', calories: 600 },
];
export default router;
