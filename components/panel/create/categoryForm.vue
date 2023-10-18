<template>
    <div>
        <div class="collection">

            <!--KATEGORIE-->

            <h3>Kategorie</h3>

            <div class="collection__container">
                <div id="categories" class="collection__container__checkboxes" v-for="item in categories" key="item.id">
                    <input class="collection__container__checkboxes-input" type="checkbox" :id="item.id"
                           @change="handleCollectionByNameChange($event, item.id,'categories')"/>
                    <label class="collection__container__checkboxes-label" :for="item.id"><span>{{
                            item.data.name
                        }}</span></label>
                </div>
            </div>
            <button v-if="collectionsToDelete.categories.length > 0" @click="removeSelectedCategories('categories')">
                Usuń zaznaczone {{ collectionsToDelete.categories.length }}
            </button>

            <form class="collection__form" @submit.prevent="addNewCategory('categories')">
                <input type="text" v-model="query.categories"/>
                <input type="submit" value="Dodaj"/>
            </form>

            <!--ZWIERZETA-->

            <h3>Zwierzęta</h3>

            <div class="collection__container">
                <div id="animals" class="collection__container__checkboxes" v-for="item in animals" key="item.id">
                    <input class="collection__container__checkboxes-input" type="checkbox" :id="item.id"
                           @change="handleCollectionByNameChange($event, item.id,'animals')"/>
                    <label class="collection__container__checkboxes-label" :for="item.id"><span>{{
                            item.data.name
                        }}</span></label>
                </div>
            </div>
            <button v-if="collectionsToDelete.animals.length > 0" @click="removeSelectedCategories('animals')">Usuń
                zaznaczone ({{ collectionsToDelete.animals.length }})
            </button>

            <form class="collection__form" @submit.prevent="addNewCategory('animals')">
                <input type="text" v-model="query.animals"/>
                <input type="submit" value="Dodaj"/>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onUnmounted, ref} from 'vue'
import {db} from "~/lib/firebase";
import {collection, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp} from "firebase/firestore";

type Category = {
    id: string;
    data: {
        name: string;
    };
}

type CollectionsToDelete = {
    categories: string[];
    animals: string[];
}

type Query = {
    categories: string;
    animals: string;
}

const collectionsToDelete = reactive<CollectionsToDelete>({
    categories: [],
    animals: []
})

const query = reactive<Query>({
    categories: "",
    animals: ""
})
const categories = ref<Category[]>([])
const animals = ref<Category[]>([])

function handleCollectionByNameChange(e: Event, id: string, collectionName: string) {
    if (e.target instanceof HTMLInputElement) {
        if (e.target.checked) {
            collectionsToDelete[collectionName].push(id);
        } else {
            collectionsToDelete[collectionName] = collectionsToDelete[collectionName].filter(item => item !== id);
        }
    }
}

async function removeSelectedCategories(collectionName: string) {
    
    const checkboxes = document.querySelectorAll(`#${collectionName} .collection__container__checkboxes-input`);
    
    for (const categoryId of collectionsToDelete[collectionName]) {
        const categoryDocRef = doc(db, collectionName, categoryId);
        try {
            await deleteDoc(categoryDocRef);
        } catch (e) {
            console.error('Error removing document:', e);
        }
    }
    collectionsToDelete[collectionName] = [];
    
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
}

async function addNewCategory(collectionName: string) {

    if (query[collectionName].length <= 2) return;

    try {
        const docRef = await addDoc(collection(db, collectionName), {
            name: query[collectionName],
            date: serverTimestamp(),
        })
        query[collectionName] = ""
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const unsubscribe = onSnapshot(collection(db, 'categories'), (querySnapshot) => {
    const data = querySnapshot.docs
        .map((doc) => ({
            data: doc.data(),
            id: doc.id,
            date: doc.data().date,
        }))
        .sort((a, b) => a.date - b.date);

    categories.value = [...data];
});

const unsubscribe2 = onSnapshot(collection(db, 'animals'), (querySnapshot) => {
    const data = querySnapshot.docs
        .map((doc) => ({
            data: doc.data(),
            id: doc.id,
            date: doc.data().date,
        }))
        .sort((a, b) => a.date - b.date);

    animals.value = [...data];
});


onUnmounted(() => {
    unsubscribe();
    unsubscribe2();
});
</script>

<style lang='scss' scoped>
.collection {
    &__container {
        margin-top: 1em;
        padding: .5em;
        border: 1px solid #c3c3c3;
        display: flex;
        flex-wrap: wrap;
        gap: .25em;

        &__checkboxes {
            &-input {
                display: none;
            }

            &-input:checked + label {
                background-color: green;
                color: #fff;
            }

            &-label {
                background-color: #b4b4b4;
                border-radius: 8px;
                color: #000;
                padding: .25em;
            }
        }
    }

    &__form {
        margin: 1em 0;
    }

}
</style>