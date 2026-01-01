import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigator />
      <Toast />
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
    </SafeAreaProvider>
  );
}
