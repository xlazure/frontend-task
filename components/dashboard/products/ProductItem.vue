<template>
    <div :class="isMinView ? 'grid' : 'list'">
        <div :class="isMinView ? 'gridBox' : 'listBox'">
            <img :src="data.image ? data.image : 'https://placehold.co/400'" />
            <p>{{ data.title }}</p>
            <p>{{ data.animal }}</p>
            <p>{{ data.category }}</p>
            <p>{{ data.price + " " + data.currency }}</p>
            <button @click="add">Dodaj do koszyka</button>
        </div>

    </div>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp()
const { item, isMinView } = defineProps(['item', 'isMinView'])
const {data} = item;
const addToCart = nuxtApp.addToCart

function add() {
    addToCart(item)
}
</script>

<style lang="scss" scoped>
.grid {
    flex-basis: 33.3%;
}

.list {
    margin-top: .5em;
    flex-basis: 100%;
    outline: 1px solid #c3c3c3;
}

.listBox {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: 60px;


    &:hover {
        opacity: .8;
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