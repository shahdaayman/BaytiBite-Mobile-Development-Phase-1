import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { MealCard } from '../src/components/MealCard';
import { Header, Screen } from '../src/components/ui';
import { meals } from '../src/data/mockData';
import { useAppViewModel } from '../src/viewmodels/AppProvider';

export default function Favorites() {
  const vm = useAppViewModel();
  const favorites = meals.filter((meal) => vm.favorites.includes(meal.id));

  return (
    <Screen>
      <Header title="My Favorites" back />
      <View className="px-5">
        {favorites.map((meal) => (
          <MealCard key={meal.id} meal={meal} horizontal />
        ))}
        {!favorites.length && (
          <View className="items-center py-20">
            <Ionicons name="heart-outline" size={56} color="#A1988C" />
            <Text className="mt-4 text-xl font-bold text-ink">
              No favorites yet
            </Text>
            <Text className="mt-1 text-center text-[#6E675E]">
              Tap the heart on a meal to save it here.
            </Text>
            <Pressable
              onPress={() => router.push('/(tabs)/search')}
              className="mt-6 rounded-2xl bg-orange px-8 py-4"
            >
              <Text className="font-bold text-white">Browse meals</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Screen>
  );
}
