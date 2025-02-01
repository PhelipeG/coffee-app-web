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
  address: {
    cep: string;
    street: string;
    number: string;
    fullAddress: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  paymentMethod: string;
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
  checkout: (order: Omit<Order, "id">) => { id: string };
}

export const useCartStore = create<CoffeeState>()(
  persist(
    (set) => ({
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
      checkout: (order) => {
        const newOrder = {
          ...order,
          id: Math.floor(Math.random() * 1000).toString(),
        };
        set((state) => ({
          orders: [...state.orders, newOrder],
          cart: [],
        }));
        console.log(newOrder);
        return newOrder;
      },
    }),
    {
      name: "@coffee-delivery:cart-state-1.0.0",
    }
  )
);
