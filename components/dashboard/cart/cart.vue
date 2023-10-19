
<template>
    <div class="cart">
        <span class="cart__bagde">{{ cart.items.length }}</span>
        <button ref="cartButtonRef" @click="() => isOpen = !isOpen">
            Koszyk
        </button>
        <div class="cart__items" v-if="isOpen">
            <div class="cart__items-item" v-if="cart.items.length > 0" v-for="item in cart.items">
                <span class="cart__items-item-title">{{ item.data.title }}</span>
                <span class="cart__items-item-buttons">
                    <span>
                        <button @click="changeQuantityValue(item, 'add')">+</button>
                        <b>{{ item.quantity }}</b>
                        <button @click="changeQuantityValue(item, 'odd')">-</button>
                    </span>
                    <button @click="removeFromCart(item)">Usuń</button>
                </span>
            </div>
            <p class="cart__items_emptyCart" v-else>Koszyk jest pusty</p>

            <div class="cart__items-options">
                <button>Przejdź do kasy</button>
                <button @click="clearCart()">Wyczyść koszyk</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp()

const cartButtonRef = ref(null)
const isOpen = ref<Boolean>(false)

const cart = nuxtApp.cart
const removeFromCart = nuxtApp.removeFromCart
const changeQuantityValue = nuxtApp.changeQuantityValue
const clearCart = nuxtApp.clearCart
</script>

<style lang="scss" scoped>
.cart {
    position: relative;

    &__bagde {
        position: absolute;
        top: -50%;
        right: -10%;
        background-color: rgb(0, 255, 8);
        padding: .1em .25em;
        border-radius: 8px;
        color: #000;
        font-size: .8rem;
    }


    &__items {
        position: absolute;
        top: 30px;
        right: -10px;
        width: 250px;
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
            }

            &:hover {
                background-color: #c3c3c3;
            }
        }

        &-options {
            display: flex;
            justify-content: space-between;
            padding: .5em 1em;
        }
    }
}
</style>