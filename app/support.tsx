import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { Header, Screen } from '../src/components/ui';

const options: Array<{
  icon: ComponentProps<typeof Ionicons>['name'];
  title: string;
  subtitle: string;
}> = [
  {
    icon: 'help-circle-outline',
    title: 'FAQs',
    subtitle: 'Find answers to common questions',
  },
  {
    icon: 'call-outline',
    title: 'Contact Us',
    subtitle: 'Get in touch with our support team',
  },
  {
    icon: 'document-text-outline',
    title: 'Report an Issue',
    subtitle: 'Help us improve your experience',
  },
  {
    icon: 'shield-checkmark-outline',
    title: 'Safety & Food Standards',
    subtitle: 'Learn about our safety measures',
  },
];

export default function Support() {
  return (
    <Screen>
      <Header title="Help & Support" back />
      <View className="px-5">
        {options.map((option) => (
          <Pressable
            key={option.title}
            onPress={() => Alert.alert(option.title, option.subtitle)}
            className="mb-3 flex-row items-center rounded-2xl border border-[#EFE4D4] bg-white p-4"
          >
            <View className="mr-4 h-11 w-11 items-center justify-center rounded-full bg-sand">
              <Ionicons name={option.icon} size={22} color="#172018" />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-ink">{option.title}</Text>
              <Text className="mt-1 text-xs text-[#6E675E]">
                {option.subtitle}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#A1988C" />
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}
