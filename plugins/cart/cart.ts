// cart.ts

import { ref } from 'vue';
import { CartItem, CartState } from './cart.type';


export const createCart = () => {
  const cart = ref<CartState>({
    items: [],
  });

  const addToCart = (item: CartItem) => {
    const existingItem = cart.value.items.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.value.items.push(item);
    }
  };

  const removeFromCart = (item: CartItem) => {
    const index = cart.value.items.findIndex((cartItem) => cartItem.id === item.id);
    if (index !== -1) {
      cart.value.items.splice(index, 1);
    }
  };

  const changeQuantityValue = (item: CartItem, operation: string) => {
    const currentItem = cart.value.items.find((cartItem) => cartItem.id === item.id);
    if (currentItem.quantity <= 1 && operation === 'odd') {
      removeFromCart(currentItem)
    }
    if (currentItem.quantity >= 0 && operation === 'add') {
      currentItem.quantity += 1;
    }
    if (currentItem.quantity > 0 && operation === 'odd') {
      currentItem.quantity -= 1;
    }
  }

  const clearCart = () => {
    cart.value.items = [];
  };

  return { cart, addToCart, removeFromCart, clearCart,changeQuantityValue };
};
