
<template>
    <header>
        <div class="search">
            <div class="input">
                <input ref="inputRef" type="text" placeholder="Search..." v-model="query" @keypress="addFocus"
                    @click="addFocus" />
                <button v-if="query.length > 0" @click="() => query = ''">X</button>
            </div>
            <div class="results" v-if="results.length > 0 && focus">
                <p v-for="res in results" @click="showProductCard(res)">{{ res.data.title }}</p>
            </div>
        </div>
        <div class="buttons">
            <CurrencyComponent />
            <CartComponent />
            <NuxtLink to="panel">
                Panel
            </NuxtLink>
        </div>
    </header>
</template>

<script setup lang="ts">
import CurrencyComponent from '@/components/dashboard/header/currency.vue';
import CartComponent from '@/components/dashboard/header/cart.vue'
import useClickOutside from '~/components/useClickOutside';

import { db } from "~/lib/firebase";
import { collection, getDocs } from "firebase/firestore";


const router = useRouter();
const query = ref<string>('')
const productsData = ref<any[]>([])
const focus = ref<boolean>(false)
const inputRef = ref<HTMLInputElement | null>(null);

function addFocus() {
    focus.value = true
}
const closeInput = () => {
    if (inputRef.value) {
        focus.value = false;
    }
};

async function loadData(collectionName: string) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map((doc) => ({ data: doc.data(), id: doc.id, quantity: 1 }));
    productsData.value = [...data];

}

const results = computed(() => {
    if (query.value.length > 2) {
        return productsData.value.filter((item: any) => item.data.title.toLowerCase().includes(query.value.toLowerCase()));
    } else {
        return [];
    }
});

function showProductCard(item: any) {
    router.push(`product/${item.id}`)
}

useClickOutside(inputRef, closeInput);
onMounted(()=>{
    loadData('products')
})
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
    flex-wrap: wrap;

    .search {
        max-width: 400px;
        width: 100%;

        .input {
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
                border-radius: 4px;
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
        gap: 1em;
        display: inline-flex;

        a {
            padding: .25em 0;
            width: 100px;
            border: 1px solid #fff;
            color: #fff;
            text-align: center;
            text-decoration: none;

            &:hover {
                &::after {
                    content: ">>"
                }
            }
        }
    }

    @media screen and (max-width:650px) {
        gap: 1em;
        justify-content: flex-end;
    }
}
</style>