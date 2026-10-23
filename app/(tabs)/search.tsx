import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { MealCard } from '../../src/components/MealCard';
import { Badge, Field, Header, Screen } from '../../src/components/ui';
import { meals } from '../../src/data/mockData';

export default function Search() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [max, setMax] = useState(100);
  const filtered = useMemo(
    () =>
      meals.filter(
        (m) =>
          (category === 'All' || m.category === category) &&
          m.price <= max &&
          `${m.name} ${m.cook} ${m.category}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [query, category, max],
  );
  return (
    <Screen>
      <Header title="Search & Filter" />
      <View className="px-5">
        <Field
          value={query}
          onChangeText={setQuery}
          placeholder="Search meals, cuisines, or cooks"
        />
        <Text className="mb-2 mt-4 font-bold text-ink">Cuisine</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
          contentContainerClassName="pr-5"
        >
          <Pressable onPress={() => setCategory('All')}>
            <Badge active={category === 'All'}>All</Badge>
          </Pressable>
          {['Egyptian', 'Healthy', 'Grilled', 'Desserts'].map((c) => (
            <Pressable key={c} onPress={() => setCategory(c)}>
              <Badge active={category === c}>{c}</Badge>
            </Pressable>
          ))}
        </ScrollView>
        <Text className="mb-2 font-bold text-ink">Maximum price</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-5"
          contentContainerClassName="pr-5"
        >
          {[50, 75, 100].map((p) => (
            <Pressable key={p} onPress={() => setMax(p)}>
              <Badge active={max === p}>Up to EGP {p}</Badge>
            </Pressable>
          ))}
        </ScrollView>
        <Text className="mb-3 text-sm text-[#6E675E]">
          {filtered.length} homemade meals
        </Text>
        {filtered.map((m) => (
          <MealCard key={m.id} meal={m} horizontal />
        ))}
        {!filtered.length && (
          <View className="items-center py-16">
            <Ionicons name="restaurant-outline" size={48} color="#6E675E" />
            <Text className="mt-3 font-bold text-ink">
              No meals match these filters
            </Text>
            <Text className="mt-1 text-[#6E675E]">
              Try a different cuisine or price.
            </Text>
          </View>
        )}
      </View>
    </Screen>
  );
}
