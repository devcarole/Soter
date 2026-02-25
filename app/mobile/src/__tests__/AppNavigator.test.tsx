import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from '../navigation/AppNavigator';
import type { RootStackParamList } from '../navigation/types';

describe('AppNavigator', () => {
  it('renders Home by default and navigates to Health route', async () => {
    const { getByText, findByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    expect(getByText('Soter')).toBeTruthy();
    expect(getByText('Check Backend Health')).toBeTruthy();
    expect(getByText('View Aid Overview (Coming Soon)')).toBeTruthy();

    fireEvent.press(getByText('Check Backend Health'));
    expect(await findByText('Checking system health...')).toBeTruthy();
  });

  it('declares AidOverview and AidDetails routes in navigator config', async () => {
    const navigationRef = createNavigationContainerRef<RootStackParamList>();
    const { findByText } = render(
      <NavigationContainer ref={navigationRef}>
        <AppNavigator />
      </NavigationContainer>
    );

    await waitFor(() => expect(navigationRef.isReady()).toBe(true));

    act(() => {
      navigationRef.navigate('AidOverview');
    });
    expect(await findByText('Aid Overview')).toBeTruthy();

    act(() => {
      navigationRef.navigate('AidDetails', { aidId: 'aid-123' });
    });
    expect(await findByText('Aid Details')).toBeTruthy();
    expect(await findByText('ID: aid-123')).toBeTruthy();
  });
});
