import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Button, Field, Screen } from '../src/components/ui';

export default function Login() {
  const [email, setEmail] = useState('demo@baytibite.app');
  const [password, setPassword] = useState('baytibite');
  return (
    <Screen>
      <View className="min-h-[760px] justify-center px-7">
        <View className="mb-10 items-center">
          <View className="mb-3 h-24 w-24 items-center justify-center rounded-[32px] bg-peach">
            <Ionicons name="home" size={55} color="#176B3A" />
            <Ionicons
              name="restaurant"
              size={24}
              color="#EF6C00"
              style={{ position: 'absolute' }}
            />
          </View>
          <Text className="text-4xl font-black text-leaf">
            Bayti<Text className="text-orange">Bite</Text>
          </Text>
          <Text className="mt-2 font-semibold text-ink">
            Homemade meals, closer to you
          </Text>
        </View>
        <Field
          icon="mail-outline"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Field
          icon="lock-closed-outline"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Pressable className="mb-5 items-end">
          <Text className="text-xs font-semibold text-orange">
            Forgot password?
          </Text>
        </Pressable>
        <Button title="Log In" onPress={() => router.replace('/(tabs)/home')} />
        <View className="mt-8 flex-row justify-center">
          <Text className="text-sm text-[#6E675E]">
            Don't have an account?{' '}
          </Text>
          <Pressable onPress={() => router.push('/signup')}>
            <Text className="text-sm font-bold text-orange">Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
