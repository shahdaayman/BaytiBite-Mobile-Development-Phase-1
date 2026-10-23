import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Badge, Header, MealImage, Screen } from '../../src/components/ui';
import { meals } from '../../src/data/mockData';
import { useAppViewModel } from '../../src/viewmodels/AppProvider';

export default function Orders() {
  const vm = useAppViewModel();
  const [filter, setFilter] = useState('All');
  const shown = vm.orders.filter(
    o =>
      filter === 'All' ||
      (filter === 'Ongoing'
        ? !['Delivered', 'Cancelled'].includes(o.status)
        : o.status === 'Delivered'),
  );

  return (
    <Screen>
      <Header title="My Orders" />
      <View className="px-5">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-5"
          contentContainerClassName="pr-5"
        >
          {['All', 'Ongoing', 'Delivered'].map(x => (
            <Pressable key={x} onPress={() => setFilter(x)}>
              <Badge active={filter === x}>{x}</Badge>
            </Pressable>
          ))}
        </ScrollView>

        {shown.map(order => {
          const meal = meals.find(m => m.id === order.items[0]?.mealId);
          const isComplete = ['Delivered', 'Cancelled'].includes(order.status);

          return (
            <View key={order.id} className="mb-3 flex-row items-center rounded-2xl bg-white p-3">
              {meal && <MealImage uri={meal.image} className="h-20 w-20 rounded-xl" />}
              <View className="ml-3 flex-1">
                <Text className="font-bold">{meal?.name ?? 'BaytiBite order'}</Text>
                <Text className="text-xs text-[#6E675E]">
                  Order #{order.id} · EGP {order.total}
                </Text>
                <Text
                  className={`mt-1 text-xs font-semibold ${
                    order.status === 'Cancelled'
                      ? 'text-red-500'
                      : order.status === 'Delivered'
                        ? 'text-leaf'
                        : 'text-orange'
                  }`}
                >
                  {order.status}
                </Text>
              </View>
              <Pressable
                onPress={() => {
                  if (isComplete) {
                    vm.reorder(order.id);
                    router.push('/cart');
                  } else {
                    router.push(`/tracking/${order.id}`);
                  }
                }}
                className="rounded-xl border border-orange px-3 py-2"
              >
                <Text className="text-xs font-bold text-orange">
                  {isComplete ? 'Reorder' : 'Track'}
                </Text>
              </Pressable>
            </View>
          );
        })}

        {!shown.length && (
          <Text className="py-16 text-center text-[#6E675E]">
            No orders in this section yet.
          </Text>
        )}
      </View>
    </Screen>
  );
}
