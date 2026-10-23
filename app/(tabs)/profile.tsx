import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { ComponentProps } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Header, Screen } from '../../src/components/ui';
import { useAppViewModel } from '../../src/viewmodels/AppProvider';

export default function Profile() {
  const vm = useAppViewModel();
  const rows: Array<{
    icon: ComponentProps<typeof Ionicons>['name'];
    label: string;
    route: Parameters<typeof router.push>[0];
  }> = [
    { icon: 'location-outline', label: 'My addresses', route: '/addresses' },
    { icon: 'card-outline', label: 'Payment methods', route: '/payments' },
    { icon: 'receipt-outline', label: 'My orders', route: '/(tabs)/orders' },
    { icon: 'heart-outline', label: 'Favorites', route: '/favorites' },
    { icon: 'help-circle-outline', label: 'Help & support', route: '/support' },
    { icon: 'settings-outline', label: 'Settings', route: '/settings' },
  ];
  return (
    <Screen>
      <Header title="My Profile" />
      <View className="items-center px-5">
        <View className="h-24 w-24 items-center justify-center rounded-full bg-peach">
          <Ionicons name="person" size={48} color="#172018" />
        </View>
        <Text className="mt-3 text-2xl font-black text-ink">{vm.userName}</Text>
        <Text className="text-sm text-[#6E675E]">
          emily.johnson@example.com
        </Text>
        <Text className="mt-1 font-semibold text-orange">Edit profile</Text>
        <View className="mt-7 w-full overflow-hidden rounded-2xl bg-white">
          {rows.map(({ icon, label, route }, index) => (
            <Pressable
              key={label}
              onPress={() => router.push(route)}
              className={`flex-row items-center p-4 ${index < rows.length - 1 ? 'border-b border-[#F0E7D9]' : ''}`}
            >
              <Ionicons name={icon} size={21} color="#172018" />
              <Text className="ml-3 flex-1 font-medium text-ink">{label}</Text>
              <Ionicons name="chevron-forward" size={18} color="#A1988C" />
            </Pressable>
          ))}
        </View>
        <Pressable
          onPress={() => router.replace('/')}
          className="mt-6 w-full rounded-2xl bg-[#FFE0D8] py-4"
        >
          <Text className="text-center font-bold text-red-600">Log out</Text>
        </Pressable>
      </View>
    </Screen>
  );
}
