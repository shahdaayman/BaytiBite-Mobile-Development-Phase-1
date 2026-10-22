import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { Header, Screen } from '../src/components/ui';

const settings: Array<{
  icon: ComponentProps<typeof Ionicons>['name'];
  title: string;
  value?: string;
}> = [
  { icon: 'person-outline', title: 'Account Settings' },
  { icon: 'notifications-outline', title: 'Notifications' },
  { icon: 'globe-outline', title: 'Language', value: 'English' },
  { icon: 'contrast-outline', title: 'Theme', value: 'Light' },
  { icon: 'lock-closed-outline', title: 'Privacy & Security' },
  { icon: 'document-text-outline', title: 'Terms & Conditions' },
  {
    icon: 'information-circle-outline',
    title: 'About BaytiBite',
    value: 'Version 1.0.0',
  },
];

export default function Settings() {
  return (
    <Screen>
      <Header title="Settings" back />
      <View className="mx-5 overflow-hidden rounded-2xl border border-[#EFE4D4] bg-white">
        {settings.map((item, index) => (
          <Pressable
            key={item.title}
            onPress={() =>
              Alert.alert(item.title, item.value ?? 'Coming soon.')
            }
            className={`flex-row items-center p-4 ${index < settings.length - 1 ? 'border-b border-[#F0E7D9]' : ''}`}
          >
            <Ionicons name={item.icon} size={21} color="#172018" />
            <Text className="ml-3 flex-1 font-medium text-ink">
              {item.title}
            </Text>
            {item.value && (
              <Text className="mr-2 text-xs text-[#6E675E]">{item.value}</Text>
            )}
            <Ionicons name="chevron-forward" size={18} color="#A1988C" />
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}
