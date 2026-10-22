import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Meal } from '../models/types';
import { useAppViewModel } from '../viewmodels/AppProvider';
import { MealImage } from './ui';

export function MealCard({
  meal,
  horizontal = false,
}: {
  meal: Meal;
  horizontal?: boolean;
}) {
  const vm = useAppViewModel();
  const favorite = vm.favorites.includes(meal.id);
  return (
    <Pressable
      onPress={() =>
        router.push({ pathname: '/meal/[id]', params: { id: meal.id } })
      }
      className={`${horizontal ? 'mb-3 flex-row' : 'mr-3 w-44'} overflow-hidden rounded-2xl border border-[#EDE1D0] bg-white`}
    >
      <View className={horizontal ? 'w-28' : ''}>
        <MealImage
          uri={meal.image}
          className={horizontal ? 'h-28 w-28' : 'h-28 w-full'}
        />
      </View>
      <View className="flex-1 p-3">
        <View className="flex-row justify-between">
          <Text numberOfLines={1} className="flex-1 font-bold text-ink">
            {meal.name}
          </Text>
          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              vm.toggleFavorite(meal.id);
            }}
          >
            <Ionicons
              name={favorite ? 'heart' : 'heart-outline'}
              color={favorite ? '#EF6C00' : '#6E675E'}
              size={19}
            />
          </Pressable>
        </View>
        <Text className="mt-1 text-xs text-[#756E65]">by {meal.cook}</Text>
        <View className="mt-2 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="star" size={13} color="#EF6C00" />
            <Text className="ml-1 text-xs text-[#756E65]">
              {meal.rating} ({meal.reviews})
            </Text>
          </View>
          <Text className="font-bold text-orange">EGP {meal.price}</Text>
        </View>
      </View>
    </Pressable>
  );
}
