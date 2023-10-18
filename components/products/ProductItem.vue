<template>
    <div :class="isMinView ? 'grid' : 'list'">
        <div :class="isMinView ? 'gridBox' : 'listBox'">
            <img :src="item.image ? item.image : 'https://placehold.co/400'"/>
            <p>{{ item.title }}</p>
            <p>{{ item.animal }}</p>
            <p>{{ item.category }}</p>
            <p>{{ item.price + " " + item.currency }}</p>
            <button>Dodaj do koszyka</button>
        </div>

    </div>
</template>

<script setup lang="ts">
const {item, isMinView} = defineProps(['item', 'isMinView'])

</script>

<style lang="scss" scoped>
.grid {
    flex-basis: 33.3%;
}

.list {
    margin-top: .5em;
    flex-basis: 100%;
    outline: 1px solid #c3c3c3;
}

.listBox {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: 60px;


    &:hover {
        opacity: .8;
    }

    img {
        height: 100%;
    }
}

.gridBox {
    padding: 1.4em;

    img {
        width: 100%;
    }
}
</style>