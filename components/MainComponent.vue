<template>
    <header>
        <div class="search">
            <div class="input">
                <input ref="inputRef" type="text" placeholder="Search..." v-model="config.query"
                       @click="()=>config.focus = true"/>
                <button v-if="config.query.length > 0" @click="()=> config.query = ''">X</button>
            </div>
            <div class="results" v-if="results.length > 0 && config.focus">
                <p v-for="res in results" @click="showProduct(res)">{{ res.title }}</p>
            </div>
        </div>
        <NuxtLink to="panel">
            <button>Panel</button>
        </NuxtLink>
    </header>
    <div class="container">
        <div>
            <CategoryForm @updateFilter="updateFilter" @resetFilter="resetFilter"/>
            <input type="checkbox" v-model="config.isMinView"/>
        </div>
        <ProductList :list="coreData.products" :isMinView="config.isMinView"/>
    </div>
</template>

<script setup lang="ts">
import CategoryForm from '@/components/CategoryForm.vue';
import ProductList from '@/components/products/ProductList.vue';
import {ref, computed, reactive, onUnmounted, onMounted} from "vue";

import {db} from "~/lib/firebase";
import {collection, getDocs} from "firebase/firestore";

type productsType = {
    title: string,
    animals: string[],
    categories: string,
    image: string,
    price: number,
    currency: string
}
const fakeProducts: productsType = [
    {
        title: "Domek sosnowy",
        animals: ['bird'],
        categories: 'three-house',
        image: "https://placehold.co/400",
        price: 256.99,
        currency: "PLN"
    },
    {
        title: "Domek brzozowy",
        animals: ['bird'],
        categories: 'three-house',
        image: "https://placehold.co/400",
        price: 336.99,
        currency: "PLN"
    },
    {
        title: "Domek dębowy",
        animals: ['bird'],
        categories: 'three-house',
        image: "https://placehold.co/400",
        price: 96.99,
        currency: "PLN"
    },
    {
        title: "Mała Chatka",
        animals: ['hamster', 'hedgehog'],
        categories: 'ground-house',
        image: "https://placehold.co/400",
        price: 36.99,
        currency: "PLN"
    },
    {
        title: "Wawrzywnik",
        animals: ['hamster'],
        categories: 'ground-house',
        image: "https://placehold.co/400",
        price: 46.99,
        currency: "PLN"
    },
    {
        title: "Domek dla ptaka",
        animals: ['bird'],
        categories: 'ground-house',
        image: "https://placehold.co/400",
        price: 156.99,
        currency: "PLN"
    },
]


const coreData = reactive<any>({
    products: []
})

async function loadData(collectionName:string) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map((doc) => ({data: doc.data(), id: doc.id}));
    coreData[collectionName] = [...data];
}

onMounted(()=>loadData('products'))

const inputRef = ref(null)

type configType = {
    query: string,
    focus: boolean,
    isMinView: boolean,
    filter: {
        animal: string,
        category: string
    }
}

let filterForm: configType = {
    animal: "",
    category: ""
}
const config = reactive<configType>({
    query: "",
    focus: false,
    isMinView: true,
    filter: {
        animal: "",
        category: ""
    }
});

function removeFocus(e) {
    if (config.focus && inputRef.value !== e.target) config.focus = false
}

function updateFilter(key, value) {
    config.filter[key] = value
}

function resetFilter() {
    console.log('reset');
    config.filter = filterForm
}


//const newArray = computed(() => {
//    return coreData.products.filter(item => {
//        if (config.filter.category && config.filter.animal) {
//            return item.categories === config.filter.category && item.animals.includes(config.filter.animal);
//        } else if (config.filter.category) {
//            return item.categories === config.filter.category;
//        } else if (config.filter.animal) {
//            return item.animals.includes(config.filter.animal);
//        } else {
//            return true;
//        }
//    });
//});

const results: any[] = computed(() => config.query.length > 2 && fakeProducts.filter(item => item.title.includes(config.query)))

function showProduct(item) {
    console.log(item)
    config.query = item.title
}

onMounted(() => {
    window.addEventListener('click', removeFocus)
})
onUnmounted(() => {
    window.removeEventListener('click', removeFocus)
})
</script>

<style lang="scss" scoped>
header {
    padding: 1em;
    position: sticky;
    width: 100%;
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
}

.container {
    overflow: hidden;
    margin: 0 auto;
    max-width: 1400px;
    display: grid;
    grid-template-columns: 200px 1fr;
}

</style>