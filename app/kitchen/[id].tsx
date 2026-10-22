import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { Image, ImageBackground, Text, View } from 'react-native';
import { MealCard } from '../../src/components/MealCard';
import { Header, Screen } from '../../src/components/ui';
import { kitchens, meals } from '../../src/data/mockData';

export default function KitchenProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const kitchen = kitchens.find((x) => x.id === id) ?? kitchens[0];
  return (
    <Screen>
      <ImageBackground source={{ uri: kitchen.banner }} className="h-52">
        <View className="bg-black/25">
          <Header title="" back />
        </View>
      </ImageBackground>
      <View className="-mt-8 rounded-t-[30px] bg-cream px-5 pt-0">
        <Image
          source={{ uri: kitchen.avatar }}
          className="-mt-12 h-24 w-24 self-center rounded-full border-4 border-cream"
        />
        <View className="mt-2 flex-row items-center justify-center">
          <Text className="text-2xl font-black text-ink">{kitchen.name}</Text>
          {kitchen.verified && (
            <Ionicons
              name="checkmark-circle"
              size={20}
              color="#176B3A"
              style={{ marginLeft: 6 }}
            />
          )}
        </View>
        <View className="mt-2 flex-row items-center justify-center">
          <Ionicons name="star" size={15} color="#EF6C00" />
          <Text className="ml-1 text-sm text-[#6E675E]">4.8 · 95 reviews</Text>
        </View>
        <View className="my-6 flex-row justify-around rounded-2xl bg-white py-4">
          <View className="items-center">
            <Text className="font-black">{kitchen.orders}+</Text>
            <Text className="text-xs text-[#6E675E]">Orders</Text>
          </View>
          <View className="items-center">
            <Text className="font-black">
              {meals.filter((m) => m.cookId === kitchen.id).length}
            </Text>
            <Text className="text-xs text-[#6E675E]">Dishes</Text>
          </View>
          <View className="items-center">
            <Text className="font-black">{kitchen.years}+ Years</Text>
            <Text className="text-xs text-[#6E675E]">On BaytiBite</Text>
          </View>
        </View>
        <Text className="mb-3 text-lg font-bold text-ink">Menu</Text>
        {meals
          .filter((m) => m.cookId === kitchen.id)
          .map((m) => (
            <MealCard key={m.id} meal={m} horizontal />
          ))}
        <Text className="mb-2 mt-5 text-lg font-bold text-ink">About</Text>
        <Text className="leading-6 text-[#625C54]">{kitchen.description}</Text>
      </View>
    </Screen>
  );
}
