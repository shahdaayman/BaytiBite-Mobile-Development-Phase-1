import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable, Text, View } from 'react-native';
import { Button, Header, Screen } from '../src/components/ui';
import { useAppViewModel } from '../src/viewmodels/AppProvider';

const cards = [
  { id: '4242', brand: 'VISA', expiry: '12/28', color: '#1D4ED8' },
  { id: '5555', brand: 'MC', expiry: '08/27', color: '#DC2626' },
];

export default function Payments() {
  const vm = useAppViewModel();
  return (
    <Screen>
      <Header title="Payment Methods" back />
      <View className="px-5">
        {cards.map((card, index) => {
          const selected = vm.payment === 'Card' && index === 0;
          return (
            <Pressable
              key={card.id}
              onPress={() => vm.setPayment('Card')}
              className={`mb-3 flex-row items-center rounded-2xl border bg-white p-4 ${selected ? 'border-orange' : 'border-[#EFE4D4]'}`}
            >
              <View
                className="mr-3 h-8 w-12 items-center justify-center rounded-md"
                style={{ backgroundColor: card.color }}
              >
                <Text className="text-[10px] font-black text-white">
                  {card.brand}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="font-bold text-ink">•••• {card.id}</Text>
                <Text className="mt-1 text-xs text-[#6E675E]">
                  Expires {card.expiry}
                </Text>
              </View>
              {selected && (
                <Text className="mr-3 rounded-full bg-leaf px-2 py-1 text-[10px] font-bold text-white">
                  Default
                </Text>
              )}
              <Pressable
                onPress={() => Alert.alert('Edit card', `•••• ${card.id}`)}
              >
                <Ionicons name="create-outline" size={19} color="#176B3A" />
              </Pressable>
            </Pressable>
          );
        })}

        <Pressable
          onPress={() => vm.setPayment('Cash on delivery')}
          className={`mb-3 flex-row items-center rounded-2xl border bg-white p-4 ${vm.payment === 'Cash on delivery' ? 'border-orange' : 'border-[#EFE4D4]'}`}
        >
          <View className="mr-3 h-10 w-12 items-center justify-center rounded-lg bg-sand">
            <Ionicons name="cash-outline" size={24} color="#172018" />
          </View>
          <View className="flex-1">
            <Text className="font-bold text-ink">Cash on Delivery</Text>
            <Text className="mt-1 text-xs text-[#6E675E]">
              Pay when you receive your order
            </Text>
          </View>
          {vm.payment === 'Cash on delivery' && (
            <Ionicons name="checkmark-circle" size={22} color="#176B3A" />
          )}
        </Pressable>

        <View className="mt-5">
          <Button
            title="Add New Payment Method"
            onPress={() =>
              Alert.alert('Add payment method', 'Card form coming next.')
            }
          />
        </View>
      </View>
    </Screen>
  );
}
