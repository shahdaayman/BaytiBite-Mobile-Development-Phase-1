import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from '../models/types';

const KEY = '@baytibite/state/v1';
export const storage = {
  async load(): Promise<AppState | null> {
    try {
      const value = await AsyncStorage.getItem(KEY);
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  },
  async save(state: AppState): Promise<void> {
    await AsyncStorage.setItem(KEY, JSON.stringify(state));
  },
  async clear(): Promise<void> {
    await AsyncStorage.removeItem(KEY);
  },
};
