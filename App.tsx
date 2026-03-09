import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PetProvider } from './src/context/PetContext';
import PetListScreen from './src/screens/PetListScreen';
import PetFormScreen from './src/screens/PetFormScreen';
import PetDetailScreen from './src/screens/PetDetailScreen';

export type RootStackParamList = {
  PetList: undefined;
  PetForm: { petId?: string } | undefined;
  PetDetail: { petId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <PetProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
          <Stack.Navigator
            initialRouteName="PetList"
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#F9FAFB' },
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="PetList" component={PetListScreen} />
            <Stack.Screen
              name="PetForm"
              component={PetFormScreen}
              options={{ animation: 'slide_from_bottom' }}
            />
            <Stack.Screen name="PetDetail" component={PetDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PetProvider>
    </SafeAreaProvider>
  );
}
