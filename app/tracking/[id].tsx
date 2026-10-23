import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { Header, Screen } from '../../src/components/ui';
import { useAppViewModel } from '../../src/viewmodels/AppProvider';

const steps = ['Confirmed', 'Preparing', 'Out for delivery', 'Delivered'];
export default function Tracking() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const order = useAppViewModel().orders.find((o) => o.id === id);
  const current = Math.max(0, steps.indexOf(order?.status ?? 'Preparing'));
  return (
    <Screen>
      <Header title="Order Tracking" back />
      <View className="px-5">
        <Text className="text-sm text-[#6E675E]">Estimated arrival</Text>
        <Text className="text-3xl font-black text-ink">25–30 min</Text>
        <Text className="mt-1 text-xs text-[#6E675E]">Order #{id}</Text>
        <View className="my-8 flex-row justify-between">
          {steps.map((s, i) => (
            <View key={s} className="w-1/4 items-center">
              <View
                className={`h-10 w-10 items-center justify-center rounded-full ${i <= current ? 'bg-orange' : 'bg-sand'}`}
              >
                <Ionicons
                  name={
                    i === 0
                      ? 'checkmark'
                      : i === 1
                        ? 'restaurant'
                        : i === 2
                          ? 'bicycle'
                          : 'home'
                  }
                  size={18}
                  color={i <= current ? 'white' : '#847A6F'}
                />
              </View>
              <Text className="mt-2 text-center text-[11px] font-semibold">
                {s}
              </Text>
            </View>
          ))}
        </View>
        <View className="h-64 overflow-hidden rounded-3xl bg-[#E7E1D4]">
          <View className="absolute left-8 top-12 h-1 w-64 rotate-12 bg-orange" />
          <View className="absolute bottom-14 right-16 h-4 w-4 rounded-full bg-leaf" />
          <Ionicons
            name="home"
            size={30}
            color="#172018"
            style={{ position: 'absolute', left: 24, top: 20 }}
          />
          <Ionicons
            name="bicycle"
            size={38}
            color="#EF6C00"
            style={{ position: 'absolute', bottom: 48, left: '50%' }}
          />
          <Ionicons
            name="location"
            size={32}
            color="#176B3A"
            style={{ position: 'absolute', right: 32, top: 80 }}
          />
          <Text className="absolute bottom-4 self-center text-xs font-semibold text-[#6E675E]">
            Live demo route · Nasr City
          </Text>
        </View>
        <View className="mt-5 flex-row items-center rounded-2xl bg-white p-4">
          <View className="h-12 w-12 items-center justify-center rounded-full bg-peach">
            <Ionicons name="person" size={24} color="#172018" />
          </View>
          <View className="ml-3 flex-1">
            <Text className="font-bold">Ahmed</Text>
            <Text className="text-xs text-[#6E675E]">Your delivery rider</Text>
          </View>
          <View className="mr-2 h-10 w-10 items-center justify-center rounded-full bg-[#EAF3EC]">
            <Ionicons name="call" size={18} color="#176B3A" />
          </View>
          <View className="h-10 w-10 items-center justify-center rounded-full bg-[#EAF3EC]">
            <Ionicons name="chatbubble" size={18} color="#176B3A" />
          </View>
        </View>
      </View>
    </Screen>
  );
}
