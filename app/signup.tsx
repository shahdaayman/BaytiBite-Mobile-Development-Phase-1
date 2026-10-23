import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Button, Field, Header, Screen } from '../src/components/ui';
export default function Signup() {
  const [agreed, setAgreed] = useState(true);
  return (
    <Screen>
      <Header title="Create Your Account" back />
      <View className="px-6">
        <Text className="mb-6 text-[#6E675E]">
          Join BaytiBite and enjoy homemade meals from your neighborhood.
        </Text>
        <Field icon="person-outline" placeholder="Full name" />
        <Field icon="mail-outline" placeholder="Email" />
        <Field icon="call-outline" placeholder="Phone number" />
        <Field
          icon="lock-closed-outline"
          placeholder="Password"
          secureTextEntry
        />
        <Field
          icon="lock-closed-outline"
          placeholder="Confirm password"
          secureTextEntry
        />
        <Pressable
          onPress={() => setAgreed(!agreed)}
          className="mb-6 flex-row items-center"
        >
          <View
            className={`mr-3 h-5 w-5 items-center justify-center rounded ${agreed ? 'bg-orange' : 'border border-[#A39A8F]'}`}
          >
            {agreed && <Ionicons name="checkmark" size={15} color="white" />}
          </View>
          <Text className="text-sm text-ink">
            I agree to the Terms and Conditions
          </Text>
        </Pressable>
        <Button
          title="Sign Up"
          disabled={!agreed}
          onPress={() => router.replace('/(tabs)/home')}
        />
      </View>
    </Screen>
  );
}
