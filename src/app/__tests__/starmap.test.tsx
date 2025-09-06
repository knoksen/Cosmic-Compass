
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StarmapPage from '../starmap/page';

jest.mock('@/components/starfield', () => {
  const StarfieldMock: React.FC = () => <div data-testid="starfield-mock" />;
  StarfieldMock.displayName = 'StarfieldMock';
  return StarfieldMock;
});
jest.mock('@/components/cosmic-dashboard', () => {
  const CosmicDashboardMock: React.FC = () => <div data-testid="cosmic-dashboard-mock" />;
  CosmicDashboardMock.displayName = 'CosmicDashboardMock';
  return CosmicDashboardMock;
});

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
