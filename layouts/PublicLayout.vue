<template>
    <div>
        <MainHeader />
        <slot />
    </div>
</template>

<script setup lang="ts">
import MainHeader from '@/components/dashboard/header/header.vue';
</script>

<style scoped>

</style>