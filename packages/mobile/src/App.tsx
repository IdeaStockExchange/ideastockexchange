/**
 * Idea Stock Exchange Mobile App
 * Main application component
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './screens/HomeScreen';
import ArgumentListScreen from './screens/ArgumentListScreen';
import ArgumentDetailScreen from './screens/ArgumentDetailScreen';
import CreateArgumentScreen from './screens/CreateArgumentScreen';

export type RootStackParamList = {
  Home: undefined;
  ArgumentList: undefined;
  ArgumentDetail: { id: string };
  CreateArgument: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#667eea',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Idea Stock Exchange' }}
          />
          <Stack.Screen
            name="ArgumentList"
            component={ArgumentListScreen}
            options={{ title: 'Arguments' }}
          />
          <Stack.Screen
            name="ArgumentDetail"
            component={ArgumentDetailScreen}
            options={{ title: 'Argument Details' }}
          />
          <Stack.Screen
            name="CreateArgument"
            component={CreateArgumentScreen}
            options={{ title: 'Create Argument' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
