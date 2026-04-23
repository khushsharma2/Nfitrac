import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HydrationTracker from '../HydrationTracker';

describe('HydrationTracker Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders initial water intake', () => {
    render(<HydrationTracker />);
    expect(screen.getByText(/Glasses of water consumed today/i)).toBeInTheDocument();
    expect(screen.getByText(/0 \/ 8/)).toBeInTheDocument();
  });

  test('increments water intake when Add Glass button is clicked', () => {
    render(<HydrationTracker />);
    const addButton = screen.getByRole('button', { name: /Add Glass/i });
    fireEvent.click(addButton);
    expect(screen.getByText(/1 \/ 8/)).toBeInTheDocument();
  });

  test('resets water intake when Reset button is clicked', () => {
    render(<HydrationTracker />);
    const addButton = screen.getByRole('button', { name: /Add Glass/i });
    const resetButton = screen.getByRole('button', { name: /Reset/i });
    fireEvent.click(addButton);
    fireEvent.click(resetButton);
    expect(screen.getByText(/0 \/ 8/)).toBeInTheDocument();
  });

  test('persists water intake in localStorage', () => {
    render(<HydrationTracker />);
    const addButton = screen.getByRole('button', { name: /Add Glass/i });
    fireEvent.click(addButton);
    expect(localStorage.getItem('waterIntake')).toBe('1');
  });
});
// not adding this test file as main i usually an trying to add some test features but i feel like these are used in other similar projects i ma trying to make something unique