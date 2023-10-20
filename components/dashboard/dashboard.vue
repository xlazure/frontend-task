<template>
    <div class="dashboard">
        <div class="dashboard__filters" :class="showFilter && 'show'">
            <div class="dashboard__filters-sticky">
                <CategoryForm @updateFilter="updateFilter" @resetFilter="resetFilter" />
                <label>
                    {{ config.isMinView ? "Grid" : "List" }} view
                    <input type="checkbox" v-model="config.isMinView" />
                </label>
            </div>
            <button class="dashboard__filters-toggleBtn" @click="() => showFilter = !showFilter">Filter {{ showFilter ? ">>" : "<<" }}</button>
        </div>
        <div class="dashboard__container">
            <ProductList :list="filteredProducts" :pending="coreData.pending" :isMinView="config.isMinView" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from "vue";
import { db } from "~/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { configType, coreDataType, productType } from './dashboard.type';



import CategoryForm from '@/components/dashboard/CategoryForm.vue';
import ProductList from '@/components/dashboard/products/ProductList.vue';


const showFilter = ref<boolean>(false);

const coreData = reactive<coreDataType>({
    products: [],
    pending: true,
})

const config = reactive<configType>({
    query: "",
    focus: false,
    isMinView: true,
    filter: {
        animal: "",
        category: ""
    }
});

async function loadData(collectionName: string) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map((doc) => ({ data: doc.data(), id: doc.id, quantity: 1 }));
    (coreData as any)[collectionName] = [...data];
    coreData.pending = false;
}




function updateFilter(key: string, value: string) {
    (config.filter as any)[key] = value;
    console.log(config.filter)
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




onMounted(() => {
    loadData('products')
});


</script>

<style lang="scss" scoped>
.dashboard {
    display: flex;
    max-width: 1500px;
    margin: 0 auto;

    &__filters {
        padding: 0 1em;
        width: 250px;
        border-right: 2px dotted #000000;

        &-toggleBtn {
            padding: .25em 0;
            width: 80px;
            border: 1px solid royalblue;
            background-color:  royalblue;
            color: #fff;
            position: absolute;
            top: 1em;
            right: -7em;
            z-index: 1012;

            @media screen and (min-width:768px) {
                display: none;
            }
        }

        &-sticky {
            top: 70px;
            left: 0;
            position: sticky;
        }



        @media screen and (max-width:768px) {
            transition: left 300ms ease-in-out;
            left: 0;
            position: fixed;
            z-index: 1011;
            height: 100%;
            background-color: #fff;

            &-sticky {
                top:120px;
            }
        }
    }

    .show {
        left: -250px;
    }

    &__container {
        width: 100%;
        position: relative;
        overflow: hidden;
        max-width: 1100px;
    }
}
</style>