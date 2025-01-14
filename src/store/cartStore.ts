import { create } from "zustand";

export interface Coffee {
  id: string;
  title: string;
  description: string;
  tags: string[];
  price: number;
  image: string;
}

type CartItem = {
  coffee: Coffee;
  quantity: number;
};
interface CoffeeState {
  coffee: Coffee[];
  cart: CartItem[];
  addToCart: (coffee: Coffee) => void;
  removeFromCart: (coffee: Coffee) => void;
  removeItem: (id: string) => void;
}

export const useCartStore = create<CoffeeState>((set) => ({
  coffee: [],
  cart: [],
  addToCart: (coffee) =>
    set((state) => {
      const existingItem = state.cart.find(
        (item) => item.coffee.id === coffee.id
      );
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.coffee.id === coffee.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { coffee, quantity: 1 }] };
    }),
  removeFromCart: (coffee) =>
    set((state) => {
      const existingItem = state.cart.find(
        (item) => item.coffee.id === coffee.id
      );
      if (existingItem) {
        return {
          cart: state.cart
            .map((item) =>
              item.coffee.id === coffee.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0), // remove item se quantidade for 0
        };
      }
      return state;
    }),
  removeItem: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.coffee.id !== id),
    })),
}));
