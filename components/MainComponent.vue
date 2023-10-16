<template>
    <div class="container">
        <div>
            <CategoryForm @updateFilter="updateFilter" @resetFilter="resetFilter"/>
            <input type="checkbox" v-model="isMinView"/>
        </div>
        <ProductList :list="newArray" :isMinView="isMinView"/>
    </div>
</template>

<script setup lang="ts">
import CategoryForm from '@/components/CategoryForm.vue';
import ProductList from '@/components/products/ProductList.vue';
import {ref,computed} from "vue";
let filterForm = {
    animal: "",
    category: ""
}

const isMinView = ref(false); 
const filter = ref({ ...filterForm }); 

function updateFilter(key,value) {
    filter.value[key] = value
}

function resetFilter() {
  console.log('reset');
  filter.value = filterForm; // Create a new object with the same properties
  console.log(filter.value);
}

const fakeProducts = [
    { title: "Domek sosnowy", animals: ['bird'], categories: 'three-house', image: "https://placehold.co/400", price: 256.99, currency: "PLN" },
    { title: "Domek brzozowy", animals: ['bird'], categories: 'three-house', image: "https://placehold.co/400", price: 336.99, currency: "PLN" },
    { title: "Domek dębowy", animals: ['bird'], categories: 'three-house', image: "https://placehold.co/400", price: 96.99, currency: "PLN" },
    { title: "Mała Chatka", animals: ['hamster', 'hedgehog'], categories: 'ground-house', image: "https://placehold.co/400", price: 36.99, currency: "PLN" },
    { title: "Wawrzywnik", animals: ['hamster'], categories: 'ground-house', image: "https://placehold.co/400", price: 46.99, currency: "PLN" },
    { title: "Domek dla ptaka", animals: ['bird'], categories: 'ground-house', image: "https://placehold.co/400", price: 156.99, currency: "PLN" },
]

const newArray = computed(() => {
    return fakeProducts.filter(item => {
        if (filter.category && filter.animal) {
            return item.categories === filter.category && item.animals.includes(filter.animal);
        } else if (filter.category) {
            return item.categories === filter.category;
        } else if (filter.animal) {
            return item.animals.includes(filter.animal);
        } else {
            return true;
        }
    });
});

</script>

<style lang="scss" scoped>
    .container {
        display:grid;
        grid-template-columns: 200px 1fr;
    }

</style>