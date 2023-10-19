<template>
    <div>
        <form @submit.prevent=""> 
            <label for="category">Kategoria</label>
            <select name="category" id="category" @change="handleChange">
                <option value="">Wybierz</option>
                <option v-for="item in filters.categories" :value="item.data.name" :key="item.id">{{ item.data.name }}</option>
            </select>
            <label for="animal">Zwierze</label>
            <select name="animal" id="animal" @change="handleChange">
                <option value="">Wybierz</option>
                <option v-for="item in filters.animals" :value="item.data.name" :key="item.id">{{ item.data.name }}</option>
            </select>
            <input type="reset" value="Reset" @click="handleReset" />
        </form>
    </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue'
import {db} from "~/lib/firebase";
import {collection, getDocs} from "firebase/firestore";
const emits = defineEmits(['updateFilter','resetFilter'])

const filters = reactive<any>({
    categories: [],
    animals: []
})

async function loadData(collectionName:string) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map((doc) => ({data: doc.data(), id: doc.id}));
    filters[collectionName] = [...data];
    
}

onMounted(()=>loadData('categories'))
onMounted(()=>loadData('animals'))

function handleReset() {
    
    emits('resetFilter')
}

function handleChange(e) {
    emits('updateFilter',e.target.name,e.target.value)
}


const fakeData = {
    categories: [
        { name: "Domki na Drzewie", value: "three-house" },
        { name: "Domki na Ziemi", value: "ground-house" },
        { name: "Wyposażenie", value: "equipment" },
        { name: "Akcesoria", value: "accessories" },
    ],
    animals: [
        { name: "Jeż", value: "Jeż" },
        { name: "Ptak", value: "Ptak" },
        { name: "Chomik", value: "Chomik" },
    ]
};
</script>

<style lang="scss" scoped>
form {
    display: flex;
    flex-direction: column;
    gap: .5em;
}
</style>