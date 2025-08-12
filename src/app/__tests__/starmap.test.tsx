
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StarmapPage from '../starmap/page';
import { destinations } from '@/lib/mock-data';

jest.mock('@/components/starfield', () => () => <div data-testid="starfield-mock" />);
jest.mock('@/components/cosmic-dashboard', () => () => <div data-testid="cosmic-dashboard-mock" />);

describe('StarmapPage', () => {
  it('renders the Starmap page with a search input and destinations', () => {
    render(<StarmapPage />);
    
    expect(screen.getByText('Starmap')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search for a planet, star, or galaxy...')).toBeInTheDocument();
    expect(screen.getByText('Destinations')).toBeInTheDocument();
  });

  it('filters destinations based on search query', () => {
    render(<StarmapPage />);
    
    const searchInput = screen.getByPlaceholderText('Search for a planet, star, or galaxy...');
    
    fireEvent.change(searchInput, { target: { value: 'proxima' } });
    
    expect(screen.getByText('Proxima Centauri b')).toBeInTheDocument();
    expect(screen.queryByText('Earth')).not.toBeInTheDocument();
  });

  it('shows a message when no destinations are found', () => {
    render(<StarmapPage />);
    
    const searchInput = screen.getByPlaceholderText('Search for a planet, star, or galaxy...');
    
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
    
    expect(screen.getByText('No destinations found for your search.')).toBeInTheDocument();
  });
});
