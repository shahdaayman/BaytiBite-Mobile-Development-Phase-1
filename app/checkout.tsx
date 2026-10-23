import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Button, Header, Screen } from '../src/components/ui';
import { useAppViewModel } from '../src/viewmodels/AppProvider';

export default function Checkout() {
  const vm = useAppViewModel();
  return (
    <Screen>
      <Header title="Checkout" back />
      <View className="px-5">
        <Text className="mb-3 text-lg font-bold text-ink">
          Delivery address
        </Text>
        <View className="mb-6 flex-row items-center rounded-2xl bg-white p-4">
          <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-peach">
            <Ionicons name="home" size={22} color="#EF6C00" />
          </View>
          <View className="flex-1">
            <Text className="font-bold">Home</Text>
            <Text className="text-sm text-[#6E675E]">{vm.address}</Text>
          </View>
          <Text className="font-semibold text-orange">Change</Text>
        </View>
        <Text className="mb-3 text-lg font-bold text-ink">Delivery time</Text>
        <View className="mb-6 rounded-2xl border border-orange bg-white p-4">
          <Text className="font-bold text-ink">● ASAP (30–45 min)</Text>
        </View>
        <Text className="mb-3 text-lg font-bold text-ink">Payment method</Text>
        {(['Cash on delivery', 'Card'] as const).map((method) => (
          <Pressable
            key={method}
            onPress={() => vm.setPayment(method)}
            className={`mb-3 flex-row items-center rounded-2xl border p-4 ${vm.payment === method ? 'border-orange bg-peach' : 'border-[#E7DCCB] bg-white'}`}
          >
            <Ionicons
              name={method === 'Card' ? 'card-outline' : 'cash-outline'}
              size={23}
              color="#EF6C00"
            />
            <Text className="ml-3 flex-1 font-semibold">{method}</Text>
            <Ionicons
              name={
                vm.payment === method ? 'radio-button-on' : 'radio-button-off'
              }
              size={22}
              color="#EF6C00"
            />
          </Pressable>
        ))}
        <View className="my-5 rounded-2xl bg-white p-4">
          <View className="flex-row justify-between">
            <Text className="font-bold">Order total</Text>
            <Text className="text-lg font-black text-orange">
              EGP {vm.cartTotal + 20}
            </Text>
          </View>
        </View>
        <Button
          title="Confirm order"
          onPress={() => {
            const order = vm.placeOrder();
            if (order)
              router.replace({
                pathname: '/tracking/[id]',
                params: { id: order.id },
              });
          }}
        />
      </View>
    </Screen>
  );
}
