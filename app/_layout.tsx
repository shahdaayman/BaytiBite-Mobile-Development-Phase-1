import { Stack } from 'expo-router';
import { AppProvider } from '../src/viewmodels/AppProvider';
import '../global.css';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="cart" />
      </Stack>
    </AppProvider>
  );
}
