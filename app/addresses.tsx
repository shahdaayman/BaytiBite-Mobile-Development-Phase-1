import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable, Text, View } from 'react-native';
import { Button, Header, Screen } from '../src/components/ui';

const addresses = [
  {
    name: 'Home',
    address: 'New Cairo, Cairo',
    phone: '+20 10 1234 5678',
    icon: 'home-outline' as const,
    primary: true,
  },
  {
    name: 'University',
    address: 'BUE, El Shorouk City',
    phone: '+20 10 9876 5432',
    icon: 'school-outline' as const,
  },
  {
    name: 'Work',
    address: 'Nasr City, Cairo',
    phone: '+20 10 5555 1111',
    icon: 'briefcase-outline' as const,
  },
];

export default function Addresses() {
  return (
    <Screen>
      <Header title="My Addresses" back />
      <View className="px-5">
        {addresses.map((item) => (
          <View
            key={item.name}
            className="mb-3 flex-row rounded-2xl border border-[#EFE4D4] bg-white p-4"
          >
            <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-peach">
              <Ionicons name={item.icon} size={22} color="#EF6C00" />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center justify-between">
                <Text className="font-bold text-ink">{item.name}</Text>
                {item.primary && (
                  <Text className="rounded-full bg-[#FFF0E2] px-2 py-1 text-[10px] font-bold text-orange">
                    Default
                  </Text>
                )}
              </View>
              <Text className="mt-1 text-sm text-[#6E675E]">
                {item.address}
              </Text>
              <Text className="mt-2 text-xs text-[#6E675E]">{item.phone}</Text>
              <View className="mt-3 flex-row justify-end">
                <Pressable
                  onPress={() => Alert.alert('Edit address', item.name)}
                  className="mr-4"
                >
                  <Ionicons name="create-outline" size={19} color="#176B3A" />
                </Pressable>
                <Pressable
                  onPress={() =>
                    Alert.alert('Remove address', `Remove ${item.name}?`)
                  }
                >
                  <Ionicons name="trash-outline" size={19} color="#DC2626" />
                </Pressable>
              </View>
            </View>
          </View>
        ))}
        <View className="mt-5">
          <Button
            title="Add New Address"
            onPress={() =>
              Alert.alert('Add address', 'Address form coming next.')
            }
          />
        </View>
      </View>
    </Screen>
  );
}
