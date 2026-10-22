export type Meal = {
  id: string;
  name: string;
  cookId: string;
  cook: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  image: string;
  description: string;
  ingredients: string[];
  tags: string[];
};
export type Kitchen = {
  id: string;
  name: string;
  avatar: string;
  banner: string;
  verified: boolean;
  orders: number;
  years: number;
  description: string;
};
export type CartItem = { mealId: string; quantity: number };
export type OrderStatus =
  'Confirmed' | 'Preparing' | 'Out for delivery' | 'Delivered' | 'Cancelled';
export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  placedAt: string;
  status: OrderStatus;
  payment: 'Cash on delivery' | 'Card';
  address: string;
};
export type AppState = {
  cart: CartItem[];
  favorites: string[];
  orders: Order[];
  userName: string;
  address: string;
  payment: 'Cash on delivery' | 'Card';
};
