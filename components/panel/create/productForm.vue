<template>
    <div class="wrapper">
        <form class="productForm" @submit.prevent="addNewProduct('products')">
            <label for="title">Nazwa</label>
            <input type="text" name="title" id="title" v-model="productForm.title">

            <label for="categories">Kategorie</label>
            <select name="categories" id="categories" v-model="productForm.category">
                <option value="">Wybierz</option>
                <option v-if="productCategoryCollection.categories.length > 0" v-for="item in productCategoryCollection.categories" :value="item.data.name">{{item.data.name}}</option>
            </select>

            <label for="animals">Zwierzęta</label>
            <select name="animals" id="animals" v-model="productForm.animal">
                <option value="">Wybierz</option>
                <option v-if="productCategoryCollection.animals.length > 0" v-for="item in productCategoryCollection.animals" :value="item.data.name">{{item.data.name}}</option>
            </select>

            <!--<label for="image">Zdjęcie</label>-->
            <!--<input type="file" name="image" id="image">-->

            <label for="price">Cena</label>
            <input type="number" name="price" id="price" v-model="productForm.price">

            <div class="productForm__buttons">
                <input type="submit" value="Dodaj"/>
                <input type="button" value="Reset" @click="()=> productForm = productBlueprint"/>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import {reactive,onMounted} from "vue";
import {db} from "~/lib/firebase";
import {collection, getDocs, addDoc} from "firebase/firestore";

const productCategoryCollection = reactive<any>({
    animals: [],
    categories: [],
})

let productBlueprint = {
    title: "",
    category: "",
    animal: "",
    image: "",
    price: null,
    currency: "PLN"
}

const productForm = reactive<any>(productBlueprint)

async function addNewProduct(collectionName: string) {
    try {
        const docRef = await addDoc(collection(db, collectionName), productForm)
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

async function loadData(collectionName:string) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map((doc) => ({data: doc.data(), id: doc.id}));
    productCategoryCollection[collectionName] = [...data];
}

onMounted(() => {
    loadData('categories');
    loadData('animals')
})
</script>

<style lang="scss" scoped>
.productForm {
    max-width: 700px;
    width: 100%;
    display: flex;
    flex-direction: column;

    input[type="number"] {
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }

    input, select {
        padding: .5em;
    }

    &__buttons {
        margin-top: 1em;
        display: grid;
        grid-template-columns: 65% 25%;
        justify-content: space-between;

    }
}
</style>