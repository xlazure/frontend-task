<template>
    <div class="product" :class="isMinView ? 'grid' : 'list'">
        <div class="product__item" :class="isMinView ? 'gridBox' : 'listBox'">
            <img class="product__item-image" :src="item.data.image ? item.data.image : imagePlaceholderUri" />
            <p class="product__item-title">{{ item.data.title }}</p>
            <p class="product__item-animal">Zwierze: {{ item.data.animal }}</p>
            <p class="product__item-category">Kategoria: {{ item.data.category }}</p>
            <p class="product__item-price">{{ formattedPrice }}</p>
            <button class="product__item-button" @click="$cart.addToCart(item)">Dodaj do koszyka</button>
        </div>

    </div>
</template>

<script setup lang="ts">
const imagePlaceholderUri = "https://placehold.co/400x400?text=Product"
const {$currencyStore, $cart} = useNuxtApp()
const { item, isMinView } = defineProps(['item', 'isMinView'])


const formattedPrice = computed(() => {
  const price = item.data.price;
  const currency = $currencyStore.currency;
  const value = $currencyStore.value;
  const exchangedPrice = price / value;
  if (currency === "USD") {
    return `$${exchangedPrice.toFixed(2)}`;
  } else if (currency === "EUR") {
    return `${exchangedPrice.toFixed(2)} €`;
  } else {
    return `${price.toFixed(2)} ${item.data.currency}`;
  }
});

</script>

<style lang="scss" scoped>

.product {
    &__item {
        &-title {
            font-size: 1.25rem;
        }
        &-button {
            border-radius: 4px;
            margin-top:1em;
            width:100%;
            padding: .45em 0;
            border: 2px solid #4169e1;
            text-transform: uppercase;
            font-weight: 700;

            &:not(.list) {
                margin-top:0em;
            }
            &:hover {
                cursor: pointer;
                background-color: #4169e1;
                color:#fff;
            }
        }
    }
}
.grid {
    transition: box-shadow 150ms ease-in-out;
    flex-basis: 33.3%;
    &:hover {
        box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.2);
    }


    @media screen and (max-width:1024px) {
        flex-basis: 50%;
    }
    @media screen and (max-width:480px) {
        flex-basis: 100%;
    }
}
.list {
    margin-left: 1.4em;
    margin-top: .5em;
    flex-basis: 95%;
    outline: 1px solid #c3c3c3;
}

.listBox {
    transition: box-shadow 150ms ease-in-out;
    display: grid;
    align-items: center;
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: 60px;


    &:hover {
        box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.2);
    }

    img {
        height: 100%;
    }
}

.gridBox {
    padding: 1.4em;

    img {
        width: 100%;
    }
}
</style>