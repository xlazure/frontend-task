<template>
   <div class="item">
      <span><slot /></span> <span>{{ product.title }}</span>
   </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['toggleProductSelection'])
const { product } = defineProps(['product'])
</script>

<style lang="scss" scoped>
.item {
   padding: .6em;
   width: 100%;
   gap: .3em;
   align-items: center;
   display: flex;
   background-color: #ffffff;

   &:nth-child(even) {
      background-color: royalblue;
      color: #fff;
   }
}
</style>