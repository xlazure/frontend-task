<template>
    <div class="products">
        <ProductItem v-if="list.length > 0" :item="item" v-for="item in list" :key="item.title" :isMinView="isMinView" />
        <p v-else>Brak produktów &#128532;</p>
    </div>
</template>

<script setup lang="ts">
import { computed, onUpdated } from 'vue'
import ProductItem from './ProductItem.vue'
const { list, isMinView } = defineProps(['list', 'isMinView'])



</script>

<style lang="scss" scoped>
.products {
    outline: 1px dotted black;
    padding: 0.5em;
    display: flex;
    flex-wrap: wrap;
}
</style>