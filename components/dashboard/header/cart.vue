
<template>
    <div class="cart">
        <span class="cart__bagde">{{ $cart.store.value.items.length }}</span>
        <button class="cart__button" ref="cartButtonRef" @click="() => isOpen = !isOpen">
            <ShoppingCart />
        </button>
        <div >
            <div class="cart__items" ref="cartItemsRef" v-if="isOpen">
                <div class="cart__items-item" v-if="$cart.store.value.items.length > 0" v-for="item in $cart.store.value.items">
                    <span class="cart__items-item-title">{{ item.data.title }}</span>
                    <span class="cart__items-item-buttons">
                        <span class="cart__items-item-buttons__group">
                            <button @click="$cart.changeQuantityValue(item, 'add')">+</button>
                            <b>{{ item.quantity }}</b>
                            <button @click="$cart.changeQuantityValue(item, 'odd')">-</button>
                        </span>
                        <button @click="$cart.removeFromCart(item)">Usuń</button>
                    </span>
                </div>
                <p class="cart__items_emptyCart" v-else>Koszyk jest pusty</p>
    
                <div class="cart__items-options">
                    <button>Przejdź do kasy</button>
                    <button @click="$cart.clearCart()">Wyczyść koszyk</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import ShoppingCart from '~/components/icons/ShoppingCart.vue';

const {$cart} = useNuxtApp()

const cartButtonRef = ref<HTMLButtonElement | null>(null);
const cartItemsRef = ref<HTMLDivElement | null>(null);
const isOpen = ref<boolean>(false);

function closeCartItems(e: Event) {
  if (
    cartItemsRef.value &&
    cartButtonRef.value &&
    !cartItemsRef.value.contains(e.target as Node) &&
    !cartButtonRef.value.contains(e.target as Node)
  ) {
    isOpen.value = false;
  }
}

onMounted(() => {
    window.addEventListener('click', closeCartItems);
});

onUnmounted(() => {
    window.removeEventListener('click', closeCartItems);
});
</script>

<style lang="scss" scoped>
.cart {
    position: relative;

    &__bagde {
        position: absolute;
        bottom: -.25em;
        right: -.25em;
        background-color: rgb(255, 0, 0);
        padding: .1em;
        border-radius: 8px;
        color: #000;
        font-size: 1rem;
        font-weight: 700;
    }

    &__button {
        svg {
            width: 18px;
            height: 18px;
        }
    }

    &__items {
        position: absolute;
        top: 35px;
        right: -10px;
        width: 300px;
        background-color: #fff;
        box-shadow: 0 0 4px 1px black;

        &_emptyCart {
            padding: .5em 1em;
        }

        &-item {
            display: flex;
            justify-content: space-between;
            padding: .5em 1em;

            &-buttons {
                display: flex;
                gap: 1em;

                &__group {
                    display: flex;
                    gap: .2em;
                }
            }

            &:hover {
                background-color: #f0f0f0;
            }
        }

        &-options {
            display: flex;
            justify-content: space-between;
            padding: .5em 1em;
        }
    }

    button {
        border: 1px solid royalblue;
        padding: .1em .25em;

        &:hover {
            cursor: pointer;
            background-color: royalblue;
            color:#fff;
        }
    }
}
</style>