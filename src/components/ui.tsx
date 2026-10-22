import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { PropsWithChildren } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Screen = ({
  children,
  scroll = true,
}: PropsWithChildren<{ scroll?: boolean }>) => (
  <SafeAreaView className="flex-1 bg-cream">
    {scroll ? (
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-28"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    ) : (
      children
    )}
  </SafeAreaView>
);
export const Header = ({
  title,
  back = false,
  right,
}: {
  title: string;
  back?: boolean;
  right?: React.ReactNode;
}) => (
  <View className="flex-row items-center justify-between px-5 pb-4 pt-3">
    <View className="w-10">
      {back && (
        <Pressable
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full bg-white"
        >
          <Ionicons name="chevron-back" size={22} color="#172018" />
        </Pressable>
      )}
    </View>
    <Text className="text-lg font-bold text-ink">{title}</Text>
    <View className="w-10 items-end">{right}</View>
  </View>
);
export const Button = ({
  title,
  onPress,
  secondary = false,
  disabled = false,
}: {
  title: string;
  onPress(): void;
  secondary?: boolean;
  disabled?: boolean;
}) => (
  <Pressable
    disabled={disabled}
    onPress={onPress}
    className={`h-14 items-center justify-center rounded-2xl ${disabled ? 'bg-sand' : secondary ? 'border border-orange bg-white' : 'bg-orange'}`}
  >
    <Text className={`font-bold ${secondary ? 'text-orange' : 'text-white'}`}>
      {title}
    </Text>
  </Pressable>
);
export const Field = ({
  placeholder,
  value,
  onChangeText,
  icon = 'search',
  secureTextEntry = false,
}: any) => (
  <View className="mb-3 flex-row items-center rounded-2xl border border-[#E7DCCB] bg-white px-4">
    <Ionicons name={icon} size={19} color="#766F66" />
    <TextInput
      className="h-14 flex-1 px-3 text-ink"
      placeholder={placeholder}
      placeholderTextColor="#9B948B"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  </View>
);
export const Badge = ({
  children,
  active = false,
}: PropsWithChildren<{ active?: boolean }>) => (
  <View
    className={`mr-2 rounded-full px-4 py-2.5 ${active ? 'bg-orange' : 'bg-sand'}`}
  >
    <Text
      className={`text-xs font-semibold ${active ? 'text-white' : 'text-ink'}`}
    >
      {children}
    </Text>
  </View>
);
export const MealImage = ({
  uri,
  className = 'h-28 w-full',
}: {
  uri: string;
  className?: string;
}) => (
  <Image
    source={{ uri }}
    className={`${className} bg-sand`}
    resizeMode="cover"
  />
);
