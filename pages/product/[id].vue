<template>
    <div class="product">
        <button class="returnButton" @click="router.back()">Return</button>
        <div class="product__card" v-if="product">
            <h2>{{ product.data.title }}</h2>
            <div class="product__card__wrapper">
                <div class="product__card__wrapper-text">
                    <p>Zwierze: {{ product.data.animal }}</p>
                    <p>Kategoria: {{ product.data.category }}</p>
                    <p>Cena: {{ currentPrice + " " + currentCurrency }}</p>
                    <button @click="$cart.addToCart(product)">Dodaj do koszyka</button>
                </div>
                <div class="product__card__wrapper-image">
                    <img src="https://placehold.co/450?text=Product" />
                </div>
            </div>
        </div>
        <div v-else>
            <Loader />
        </div>
    </div>
</template>

<script setup lang="ts">
import { doc, getDoc } from "firebase/firestore";
import { db } from "~/lib/firebase";
import Loader from '@/components/animations/Loader.vue'
const { $currencyStore } = useNuxtApp()


const router = useRouter()
const route = useRoute()

const product = ref<any>(null)





const currentPrice = computed(() => {
    if ($currencyStore.currency !== 'PLN') {
        const newPrice = product.value.data.price / $currencyStore.value
        return newPrice.toFixed(2)
    }
    return product.value.data.price
})

const currentCurrency = computed(() => {
    if ($currencyStore.currency !== 'PLN') {
        return $currencyStore.currency
    }
    return product.value.data.currency
})

async function getProduct() {
    const id: any = route.params.id
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        product.value = {data: docSnap.data(), quantity: 1};
    } else {
        console.log("No such document!");
    }
}

onBeforeMount(() => getProduct())

</script>

<style lang="scss" scoped>
.returnButton {
    padding: .25em 0;
    width: 100px;
    font-weight: 700;
    border: 1px solid royalblue;

    &:hover {
        cursor: pointer;

        &::before {
            content: "<< "
        }
    }
}

.product {
    padding: 1em;

    &__card {
        padding: 2em;
        margin-top: 2em;
        box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.232);

        &__wrapper {
            display: flex;
            justify-content: space-between;
            margin-top: 1.25em;

            @media screen and (max-width:768px) {

                flex-direction: column-reverse;
                gap: 1em;
            }

            button {
                border-radius: 4px;
                margin-top:1em;
                width:100%;
                padding: .45em 0;
                border: 2px solid #4169e1;
                text-transform: uppercase;
                font-weight: 700;
    
            
                &:hover {
                    cursor: pointer;
                    background-color: #4169e1;
                    color:#fff;
                }
            }

            &-image {
                img {
                    width: 100%;
                }
            }
        }

        h2 {
            margin-bottom: .25em;
            border-bottom: 1px solid black;
            font-size: 2rem;
        }

        p {
            font-size: 1.25rem;
        }
    }
}
</style>