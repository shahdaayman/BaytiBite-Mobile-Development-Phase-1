import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#EF6C00',
        tabBarInactiveTintColor: '#6E675E',
        tabBarStyle: {
          height: 72,
          paddingTop: 8,
          paddingBottom: 10,
          backgroundColor: '#FFFDF8',
          borderTopColor: '#EFE4D4',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="home"
              size={22}
              color={typeof color === 'string' ? color : '#6E675E'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="search"
              size={22}
              color={typeof color === 'string' ? color : '#6E675E'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="receipt"
              size={22}
              color={typeof color === 'string' ? color : '#6E675E'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="person"
              size={22}
              color={typeof color === 'string' ? color : '#6E675E'}
            />
          ),
        }}
      />
    </Tabs>
  );
}
