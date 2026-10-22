import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { initialOrders, meals } from '../data/mockData';
import { AppState, Order } from '../models/types';
import { storage } from '../services/storage';

const initial: AppState = {
  cart: [],
  favorites: [],
  orders: initialOrders,
  userName: 'Emily Johnson',
  address: 'Nasr City, Cairo',
  payment: 'Cash on delivery',
};
type VM = AppState & {
  hydrated: boolean;
  cartCount: number;
  cartTotal: number;
  addToCart(id: string, qty?: number): void;
  updateQty(id: string, delta: number): void;
  toggleFavorite(id: string): void;
  setPayment(value: AppState['payment']): void;
  placeOrder(): Order | null;
  reorder(id: string): void;
  resetDemo(): Promise<void>;
};
const Ctx = createContext<VM | null>(null);

export function AppProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState(initial);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    storage.load().then((saved) => {
      if (saved) {
        setState({
          ...saved,
          userName:
            saved.userName === 'Judy Amr' ? 'Emily Johnson' : saved.userName,
        });
      }
      setHydrated(true);
    });
  }, []);
  useEffect(() => {
    if (hydrated) storage.save(state);
  }, [state, hydrated]);
  const api = useMemo<VM>(
    () => ({
      ...state,
      hydrated,
      cartCount: state.cart.reduce((a, b) => a + b.quantity, 0),
      cartTotal: state.cart.reduce(
        (sum, item) =>
          sum +
          (meals.find((m) => m.id === item.mealId)?.price ?? 0) * item.quantity,
        0,
      ),
      addToCart(id, qty = 1) {
        setState((s) => ({
          ...s,
          cart: s.cart.some((x) => x.mealId === id)
            ? s.cart.map((x) =>
                x.mealId === id ? { ...x, quantity: x.quantity + qty } : x,
              )
            : [...s.cart, { mealId: id, quantity: qty }],
        }));
      },
      updateQty(id, delta) {
        setState((s) => ({
          ...s,
          cart: s.cart
            .map((x) =>
              x.mealId === id ? { ...x, quantity: x.quantity + delta } : x,
            )
            .filter((x) => x.quantity > 0),
        }));
      },
      toggleFavorite(id) {
        setState((s) => ({
          ...s,
          favorites: s.favorites.includes(id)
            ? s.favorites.filter((x) => x !== id)
            : [...s.favorites, id],
        }));
      },
      setPayment(value) {
        setState((s) => ({ ...s, payment: value }));
      },
      placeOrder() {
        if (!state.cart.length) return null;
        const made: Order = {
          id: `BB${Math.floor(1000 + Math.random() * 9000)}`,
          items: state.cart,
          total:
            state.cart.reduce(
              (sum, i) =>
                sum +
                (meals.find((m) => m.id === i.mealId)?.price ?? 0) * i.quantity,
              0,
            ) + 20,
          placedAt: new Date().toISOString(),
          status: 'Preparing',
          payment: state.payment,
          address: state.address,
        };
        setState((s) => ({ ...s, orders: [made, ...s.orders], cart: [] }));
        return made;
      },
      reorder(id) {
        setState((s) => {
          const order = s.orders.find((o) => o.id === id);
          return order ? { ...s, cart: order.items } : s;
        });
      },
      async resetDemo() {
        await storage.clear();
        setState(initial);
      },
    }),
    [state, hydrated],
  );
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}
export const useAppViewModel = () => {
  const value = useContext(Ctx);
  if (!value) throw new Error('AppProvider missing');
  return value;
};
