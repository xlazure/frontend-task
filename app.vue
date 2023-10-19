<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { createCart } from '~/plugins/cart/cart'
const nuxtApp = useNuxtApp()

const { cart, addToCart, removeFromCart, clearCart, changeQuantityValue } = createCart();

nuxtApp.cart = cart;
nuxtApp.addToCart = addToCart;
nuxtApp.removeFromCart = removeFromCart;
nuxtApp.changeQuantityValue = changeQuantityValue;
nuxtApp.clearCart = clearCart;


</script>
