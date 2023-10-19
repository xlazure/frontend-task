// types/cart-types.ts

export interface CartItem {
  quantity: number;
  id: string; // Add the 'id' property
  data: {
    title: string;
    animal: string;
    category: string;
    image: string;
    price: number;
    currency: string;
  };
}

export interface CartState {
  items: CartItem[];
}

export type CartAction = 'add' | 'remove' | 'clear';
