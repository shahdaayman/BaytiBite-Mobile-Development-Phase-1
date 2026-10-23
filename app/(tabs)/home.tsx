import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { router } from 'expo-router';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { MealCard } from '../../src/components/MealCard';
import { Badge, Screen } from '../../src/components/ui';
import { meals } from '../../src/data/mockData';
import { useAppViewModel } from '../../src/viewmodels/AppProvider';

const categories: Array<{
  icon: ComponentProps<typeof Ionicons>['name'];
  label: string;
}> = [
  { icon: 'restaurant-outline', label: 'Egyptian' },
  { icon: 'leaf-outline', label: 'Healthy' },
  { icon: 'pizza-outline', label: 'Pasta' },
  { icon: 'flame-outline', label: 'Grilled' },
  { icon: 'ice-cream-outline', label: 'Desserts' },
];

export default function Home() {
  const { cartCount } = useAppViewModel();
  return (
    <Screen>
      <View className="px-5 pt-4">
        <View className="mb-4 flex-row items-center justify-between">
          <View>
            <Text className="text-xs text-[#6E675E]">Delivering to</Text>
            <View className="flex-row items-center">
              <Ionicons name="location" size={16} color="#EF6C00" />
              <Text className="ml-1 font-bold text-ink">Cairo, Egypt</Text>
              <Ionicons name="chevron-down" size={15} color="#172018" />
            </View>
          </View>
          <Pressable
            onPress={() => router.push('/cart')}
            className="h-11 w-11 items-center justify-center rounded-full bg-white"
          >
            <Ionicons name="bag-outline" size={22} color="#172018" />
            {cartCount > 0 && (
              <View className="absolute -right-1 -top-1 h-5 min-w-5 items-center justify-center rounded-full bg-orange">
                <Text className="text-[10px] font-bold text-white">
                  {cartCount}
                </Text>
              </View>
            )}
          </Pressable>
        </View>
        <Pressable
          onPress={() => router.push('/(tabs)/search')}
          className="mb-4 flex-row items-center rounded-2xl bg-white px-4 py-4"
        >
          <Ionicons name="search" size={20} color="#756E65" />
          <Text className="ml-3 text-[#A0988E]">
            Search meals, cuisines, or cooks...
          </Text>
        </Pressable>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-5 pb-4"
      >
        {categories.map(({ icon, label }) => (
          <Badge key={label}>
            <Ionicons name={icon} size={14} color="#172018" /> {label}
          </Badge>
        ))}
      </ScrollView>
      <View className="px-5">
        <ImageBackground
          source={{ uri: meals[3].image }}
          className="mb-6 h-40 overflow-hidden rounded-3xl"
          imageStyle={{ borderRadius: 24 }}
        >
          <View className="flex-1 justify-center bg-black/30 p-5">
            <Text className="w-44 text-2xl font-black text-white">
              Real Home Cooking. Real People.
            </Text>
            <Pressable
              onPress={() => router.push('/(tabs)/search')}
              className="mt-3 w-28 rounded-xl bg-orange py-3"
            >
              <Text className="text-center text-xs font-bold text-white">
                Explore now
              </Text>
            </Pressable>
          </View>
        </ImageBackground>
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-xl font-bold text-ink">Popular near you</Text>
          <Pressable onPress={() => router.push('/(tabs)/search')}>
            <Text className="text-sm font-semibold text-orange">See all</Text>
          </Pressable>
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-5"
      >
        {meals.slice(0, 4).map((m) => (
          <MealCard key={m.id} meal={m} />
        ))}
      </ScrollView>
      <View className="mx-5 mt-7 rounded-3xl bg-leaf p-5">
        <Text className="text-lg font-bold text-white">
          Meet your neighborhood cooks
        </Text>
        <Text className="mt-1 text-sm text-white/80">
          Fresh meals, local stories, stronger communities.
        </Text>
        <Pressable
          onPress={() => router.push('/kitchen/teta')}
          className="mt-4 self-start rounded-xl bg-white px-4 py-3"
        >
          <Text className="font-bold text-leaf">Visit Teta's Kitchen</Text>
        </Pressable>
      </View>
    </Screen>
  );
}
