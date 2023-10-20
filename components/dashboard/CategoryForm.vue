<template>
    <div>
        <form @submit.prevent="">
            <label for="category">Kategoria</label>
            <select name="category" id="category" @change="handleChange">
                <option value="">Wybierz</option>
                <option v-for="item in filters.categories" :value="item.data.name" :key="item.id">{{ item.data.name }}
                </option>
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
import { reactive } from 'vue'
import { db } from "~/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
const emits = defineEmits(['updateFilter', 'resetFilter'])

const filters = reactive<any>({
    categories: [],
    animals: []
})

async function loadData(collectionName: string) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map((doc) => ({ data: doc.data(), id: doc.id }));
    filters[collectionName] = [...data];

}

function handleReset() {
    emits('resetFilter')
}

function handleChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    emits('updateFilter', target.name, target.value)
}

onMounted(() => {
    loadData('categories')
    loadData('animals')
})
</script>

<style lang="scss" scoped>
form {
    margin-bottom: 1em;
    display: flex;
    flex-direction: column;
    gap: 1em;

    label {
        font-weight: bold;
    }

    select {
        border-bottom: 1px solid black;
    }

    input[type='reset'] {
        border-radius: 4px;
        padding: .25em 0;
        margin-top:.5em;
        background-color:transparent;
        border: 2px solid royalblue;

        &:hover {
            color: #fff;
            background-color: royalblue;
            cursor:pointer;
        }
    }
}
</style>