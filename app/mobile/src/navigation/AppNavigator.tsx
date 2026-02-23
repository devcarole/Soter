import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { HomeScreen } from '../screens/HomeScreen';
import { HealthScreen } from '../screens/HealthScreen';
// Future Aid Screens
import { AidOverviewScreen } from '../screens/AidOverviewScreen';
import { AidDetailsScreen } from '../screens/AidDetailsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      {/* Core Screens */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Health"
        component={HealthScreen}
        options={{ title: 'System Health' }}
      />

      {/* Aid Flow Screens (Placeholders) */}
      <Stack.Screen
        name="AidOverview"
        component={AidOverviewScreen}
        options={{ title: 'Aid Overview' }}
      />
      <Stack.Screen
        name="AidDetails"
        component={AidDetailsScreen}
        options={{ title: 'Aid Details' }}
      />
    </Stack.Navigator>
  );
};
