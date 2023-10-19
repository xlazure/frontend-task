<template>
    <header>
        <div class="search">
            <div class="input">
                <input ref="inputRef" type="text" placeholder="Search..." v-model="config.query"
                    @click="() => config.focus = true" />
                <button v-if="config.query.length > 0" @click="() => config.query = ''">X</button>
            </div>
            <div class="results" v-if="results.length > 0 && config.focus">
                <p v-for="res in results" @click="showProduct(res)">{{ res.data.title }}</p>
            </div>
        </div>
        <div class="buttons">
            <CartComponent />
            <NuxtLink to="panel">
                <button>Panel</button>
            </NuxtLink>
        </div>
    </header>
    <div class="filters">
        <CategoryForm @updateFilter="updateFilter" @resetFilter="resetFilter" />
        <input type="checkbox" v-model="config.isMinView" />
    </div>
    <div class="container">
        <ProductList :list="filteredProducts" :pending="coreData.pending" :isMinView="config.isMinView" />
    </div>
</template>

<script setup lang="ts">
import CartComponent from '@/components/dashboard/cart/cart.vue';
import CategoryForm from '@/components/dashboard/CategoryForm.vue';
import ProductList from '@/components/dashboard/products/ProductList.vue';
import { ref, computed, reactive, onUnmounted, onMounted } from "vue";

import { db } from "~/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { configType, coreDataType, productType } from './dashboard.type';

const inputRef = ref(null);



const coreData = reactive<coreDataType>({
    products: [],
    pending: true,
})

async function loadData(collectionName: string) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map((doc) => ({ data: doc.data(), id: doc.id, quantity: 1 }));
    (coreData as any)[collectionName] = [...data];
    coreData.pending = false;
}

onMounted(() => loadData('products'));


const config = reactive<configType>({
    query: "",
    focus: false,
    isMinView: true,
    filter: {
        animal: "",
        category: ""
    }
});

function removeFocus(e: Event) {
    if (config.focus && inputRef.value !== e.target) config.focus = false
}

function updateFilter(key: string, value: string) {
    (config.filter as any)[key] = value;
}

function resetFilter() {
    config.filter = {
        animal: "",
        category: ""
    };
}


const filteredProducts = computed(() => {
    return coreData.products.filter((product: productType) => {
        const { animal, category } = product.data;
        const { filter } = config;
        // Check for filter conditions
        if (filter.category && filter.animal) {
            return animal.includes(filter.animal) && category.includes(filter.category);
        } else if (filter.category) {
            return category === filter.category;
        } else if (filter.animal) {
            return animal.includes(filter.animal);
        } else {
            return true;
        }
    });
});

const results = computed(() => {
    if (config.query.length > 2) {
        return coreData.products.filter((item: productType) => item.data.title.toLowerCase().includes(config.query.toLowerCase()));
    } else {
        return [];
    }
});

function showProduct(item: productType) {
    // config.query = item.data.title;
}

onMounted(() => {
    window.addEventListener('click', removeFocus);
});

onUnmounted(() => {
    window.removeEventListener('click', removeFocus);
});
</script>

<style lang="scss" scoped>
header {
    padding: 1em;
    position: sticky;
    width: 100%;
    z-index: 1020;
    top: 0;
    left: 0;
    background-color: royalblue;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .search {
        .input {
            width: 400px;
            position: relative;

            button {
                height: 100%;
                padding: 0 1em;
                position: absolute;
                top: 0;
                right: 0;
                background-color: transparent;
                border: none;
            }

            input[type="text"] {
                padding: .4em;
                width: 100%;

            }
        }

        .results {
            background-color: #fff;
            position: fixed;
            width: 400px;
            top: 3em;
            left: 1em;

            p:hover {
                background-color: #c3c3c3;
                cursor: pointer;
            }
        }
    }

    .buttons {
        display: inline-flex;
    }
}

.filters {
    z-index: 1019;
    height: fit-content;
    position: fixed;
    width: 200px;
    top: 100px;
    left: 1.5em;
}

.container {
    margin: 0 auto;
    padding: 0 0px 0 200px;
    position: relative;
    overflow: hidden;
    max-width: 1400px;
}
</style>