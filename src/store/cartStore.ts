/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { persist } from "zustand/middleware";

//produto cafe
export interface Coffee {
  id: string;
  title: string;
  description: string;
  tags: string[];
  price: number;
  image: string;
}
// item do carrinho -> cafe + quantidade
type CartItem = {
  coffee: Coffee;
  quantity: number;
};
// pedido -> id + itens + total
interface Order {
  id: string;
  items: CartItem[];
  total: number;
}
// estado do carrinho
interface CoffeeState {
  coffee: Coffee[]; // produtos
  cart: CartItem[]; // carrinho
  orders: Order[]; // pedidos
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  incrementItemQuantity: (id: string) => void;
  decrementItemQuantity: (id: string) => void;
  checkout: (order: Omit<Order, "id">) => void;
}

export const useCartStore = create<CoffeeState>()(
  persist(
    (set, get) => ({
      coffee: [],
      cart: [],
      orders: [],
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.coffee.id === item.coffee.id
          );
          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.coffee.id === item.coffee.id
                  ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                  : cartItem
              ),
            };
          } else {
            return { cart: [...state.cart, item] };
          }
        }),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((cartItem) => cartItem.coffee.id !== id),
        })),
      incrementItemQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((cartItem) =>
            cartItem.coffee.id === id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        })),
      decrementItemQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((cartItem) =>
            cartItem.coffee.id === id && cartItem.quantity > 1
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          ),
        })),
      checkout: (order) =>
        set((state) => ({
          orders: [...state.orders, { ...order, id: new Date().toISOString() }],
          cart: [],
        })),
    }),
    {
      name: "@coffee-delivery:cart-state-1.0.0",
    }
  )
);
