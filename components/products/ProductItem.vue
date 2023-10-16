<template>
    <div :class="currentView">
        <input type="checkbox" v-model="isMinView" />
        <div :class="currentView2">
            <img :src="item.image" />
            <p>{{ item.title }}</p>
            <p>{{ item.animals }}</p>
            <p>{{ item.categories }}</p>
            <p>{{ item.price + " " + item.currency }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed,ref} from 'vue'
const isMinView = ref(false);
const { item } = defineProps(['item'])
const currentView = computed(() => {
  console.log('isMinView:', isMinView);
  return isMinView ? 'grid' : 'list';
});

const currentView2 = computed(() => {
  console.log('isMinView:', isMinView);
  return isMinView ? 'gridBox' : 'listBox';
});

</script>

<style lang="scss" scoped>
.grid {
    flex-basis:33.3%;
}

.list {
    flex-basis:100%;
}
.listBox {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: 60px;


    &:hover {
        opacity: .8;
    }

    img {
        height: 100%;
    }
}
.gridBox {
    padding: .4em;
    img {
        width: 100%;
    }
}
</style>