import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Button, Header, MealImage, Screen } from '../../src/components/ui';
import { meals } from '../../src/data/mockData';
import { useAppViewModel } from '../../src/viewmodels/AppProvider';

export default function Cart() {
  const vm = useAppViewModel();
  return (
    <Screen>
      <Header title="Your Cart" back />
      <View className="px-5">
        {vm.cart.map((item) => {
          const meal = meals.find((m) => m.id === item.mealId)!;
          return (
            <View
              key={item.mealId}
              className="mb-3 flex-row items-center rounded-2xl bg-white p-3"
            >
              <MealImage uri={meal.image} className="h-20 w-20 rounded-xl" />
              <View className="ml-3 flex-1">
                <Text className="font-bold text-ink">{meal.name}</Text>
                <Text className="mt-1 text-xs text-[#6E675E]">
                  by {meal.cook}
                </Text>
                <Text className="mt-1 font-bold text-orange">
                  EGP {meal.price}
                </Text>
              </View>
              <View className="flex-row items-center rounded-xl bg-cream">
                <Pressable
                  onPress={() => vm.updateQty(meal.id, -1)}
                  className="p-3"
                >
                  <Ionicons name="remove" size={18} color="#172018" />
                </Pressable>
                <Text className="font-bold">{item.quantity}</Text>
                <Pressable
                  onPress={() => vm.updateQty(meal.id, 1)}
                  className="p-3"
                >
                  <Ionicons name="add" size={18} color="#172018" />
                </Pressable>
              </View>
            </View>
          );
        })}
        {!vm.cart.length && (
          <View className="items-center py-20">
            <Ionicons name="basket-outline" size={56} color="#6E675E" />
            <Text className="mt-4 text-xl font-bold text-ink">
              Your basket is empty
            </Text>
            <Text className="mt-1 text-[#6E675E]">
              A homemade favorite is only a tap away.
            </Text>
            <View className="mt-6 w-full">
              <Button
                title="Browse meals"
                onPress={() => router.replace('/(tabs)/search')}
              />
            </View>
          </View>
        )}
        {vm.cart.length > 0 && (
          <>
            <View className="my-5 rounded-2xl bg-white p-4">
              <View className="mb-2 flex-row justify-between">
                <Text className="text-[#6E675E]">Subtotal</Text>
                <Text>EGP {vm.cartTotal}</Text>
              </View>
              <View className="mb-3 flex-row justify-between">
                <Text className="text-[#6E675E]">Delivery fee</Text>
                <Text>EGP 20</Text>
              </View>
              <View className="border-t border-[#EEE3D4] pt-3">
                <View className="flex-row justify-between">
                  <Text className="text-lg font-bold">Total</Text>
                  <Text className="text-lg font-black text-orange">
                    EGP {vm.cartTotal + 20}
                  </Text>
                </View>
              </View>
            </View>
            <Button
              title="Proceed to checkout"
              onPress={() => router.push('/checkout')}
            />
          </>
        )}
      </View>
    </Screen>
  );
}
