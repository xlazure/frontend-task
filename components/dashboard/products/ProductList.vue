<template>
  <div v-if="pending" class="loading">
        <Loader />
    </div>
    <div v-else class="products">
        <ProductItem v-if="list.length > 0" :item="item" v-for="item in list" :key="item.id" :isMinView="isMinView"/>
        <p v-else>Brak produktów &#128532;</p>
    </div>
</template>

<script setup lang="ts">
import ProductItem from '@/components/dashboard/products/ProductItem.vue'
import Loader from '@/components/animations/Loader.vue'
const {list, isMinView,pending} = defineProps(['list', 'isMinView','pending'])
</script>

<style lang="scss" scoped>
.loading {
    display: flex;
    align-items: center;
    justify-content: center;
}

.products {
    padding: 0.5em;
    display: flex;
    flex-wrap: wrap;
}
</style>