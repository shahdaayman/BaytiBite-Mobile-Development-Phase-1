import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import {
  Badge,
  Button,
  Header,
  MealImage,
  Screen,
} from '../../src/components/ui';
import { meals } from '../../src/data/mockData';
import { useAppViewModel } from '../../src/viewmodels/AppProvider';

export default function MealDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const meal = meals.find((x) => x.id === id) ?? meals[0];
  const [qty, setQty] = useState(1);
  const vm = useAppViewModel();
  return (
    <Screen>
      <Header
        title="Meal details"
        back
        right={
          <Pressable onPress={() => vm.toggleFavorite(meal.id)}>
            <Ionicons
              name={vm.favorites.includes(meal.id) ? 'heart' : 'heart-outline'}
              size={24}
              color="#EF6C00"
            />
          </Pressable>
        }
      />
      <MealImage uri={meal.image} className="h-72 w-full" />
      <View className="-mt-5 rounded-t-[30px] bg-cream px-6 pt-6">
        <View className="flex-row items-start justify-between">
          <View>
            <Text className="text-3xl font-black text-ink">{meal.name}</Text>
            <Pressable onPress={() => router.push(`/kitchen/${meal.cookId}`)}>
              <Text className="mt-1 font-semibold text-orange">
                by {meal.cook} ›
              </Text>
            </Pressable>
          </View>
          <Text className="text-xl font-black text-orange">
            EGP {meal.price}
          </Text>
        </View>
        <View className="mt-3 flex-row items-center">
          <Ionicons name="star" size={16} color="#EF6C00" />
          <Text className="ml-1 text-sm">
            {meal.rating} ({meal.reviews} reviews)
          </Text>
        </View>
        <View className="mt-3 flex-row">
          {meal.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </View>
        <Text className="mb-2 mt-6 text-lg font-bold text-ink">
          Description
        </Text>
        <Text className="leading-6 text-[#625C54]">{meal.description}</Text>
        <Text className="mb-3 mt-6 text-lg font-bold text-ink">
          Ingredients
        </Text>
        <View className="flex-row flex-wrap">
          {meal.ingredients.map((i) => (
            <View key={i} className="mb-2 mr-2 rounded-2xl bg-white px-4 py-3">
              <Text className="text-sm">{i}</Text>
            </View>
          ))}
        </View>
        <View className="mt-6 flex-row items-center">
          <View className="mr-3 flex-row items-center rounded-2xl bg-white">
            <Pressable
              onPress={() => setQty(Math.max(1, qty - 1))}
              className="p-4"
            >
              <Ionicons name="remove" size={20} color="#172018" />
            </Pressable>
            <Text className="font-bold">{qty}</Text>
            <Pressable onPress={() => setQty(qty + 1)} className="p-4">
              <Ionicons name="add" size={20} color="#172018" />
            </Pressable>
          </View>
          <View className="flex-1">
            <Button
              title={`Add to cart · EGP ${meal.price * qty}`}
              onPress={() => {
                vm.addToCart(meal.id, qty);
                router.push('/cart');
              }}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}
