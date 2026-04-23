import React from 'react';
import { render, screen } from '@testing-library/react';
import Achievements from '../Achievements';

describe('Achievements Component', () => {
  test('renders all achievement titles', () => {
    render(<Achievements activitiesCount={5} hydrationGoalMet={true} caloriesBurned={1200} />);
    expect(screen.getByText(/Getting Started/i)).toBeInTheDocument();
    expect(screen.getByText(/Hydration Hero/i)).toBeInTheDocument();
    expect(screen.getByText(/Calorie Burner/i)).toBeInTheDocument();
    expect(screen.getByText(/Fitness Enthusiast/i)).toBeInTheDocument();
  });

  test('shows achieved badges with full opacity', () => {
    render(<Achievements activitiesCount={5} hydrationGoalMet={true} caloriesBurned={1200} />);
    const achievedBadges = screen.getAllByRole('heading', { level: 4 });
    achievedBadges.forEach((badge) => {
      expect(badge.parentElement).toHaveStyle('opacity: 1');
    });
  });

  test('shows unachieved badges with reduced opacity', () => {
    render(<Achievements activitiesCount={0} hydrationGoalMet={false} caloriesBurned={0} />);
    const badges = screen.getAllByRole('heading', { level: 4 });
    badges.forEach((badge) => {
      expect(badge.parentElement).toHaveStyle('opacity: 0.6');
    });
  });
});
// not using 