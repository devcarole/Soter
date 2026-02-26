import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { HomeScreen } from '../screens/HomeScreen';

jest.spyOn(Alert, 'alert');

describe('HomeScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    expect(getByText('Soter')).toBeTruthy();
    expect(getByText('Powered by Stellar')).toBeTruthy();
    expect(getByText('Transparent aid, directly delivered.')).toBeTruthy();
    expect(getByText('View Aid Overview (Coming Soon)')).toBeTruthy();
    expect(getByText('View Aid Details (Coming Soon)')).toBeTruthy();
    expect(getByText(/Stellar network and Soroban smart contracts/)).toBeTruthy();
  });

  it('navigates to Health Screen when primary button is pressed', () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    const button = getByText('Check Backend Health');

    fireEvent.press(button);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Health');
  });

  it('shows an alert when placeholder buttons are pressed', () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);

    fireEvent.press(getByText('View Aid Overview (Coming Soon)'));
    expect(Alert.alert).toHaveBeenCalledWith('Coming Soon', 'Coming in a future wave');

    fireEvent.press(getByText('View Aid Details (Coming Soon)'));
    expect(Alert.alert).toHaveBeenCalledTimes(2);
  });
});
