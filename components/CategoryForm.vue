<template>
    <div>
        <form @submit.prevent=""> 
            <label for="category">Kategoria</label>
            <select name="category" id="category" @change="handleChange">
                <option value="">Wybierz</option>
                <option v-for="item in fakeData.categories" :value="item.value" :key="item.value">{{ item.name }}</option>
            </select>
            <label for="animal">Zwierze</label>
            <select name="animal" @change="handleChange">
                <option value="">Wybierz</option>
                <option v-for="item in fakeData.animals" :value="item.value" :key="item.value">{{ item.name }}</option>
            </select>
            <input type="reset" value="Reset" @click="handleReset" />
        </form>
    </div>
</template>

<script setup lang="ts">

const emits = defineEmits(['updateFilter','resetFilter'])

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
        { name: "Jeż", value: "hedgehog" },
        { name: "Ptaki", value: "bird" },
        { name: "Chomiki", value: "hamster" },
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