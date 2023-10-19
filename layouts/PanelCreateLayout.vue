<template>
    <div>
        <PanelNavigationCreateForm/>
        <slot />
    </div>
</template>

<script setup lang="ts">
import PanelNavigationCreateForm from '@/components/navigation/createForm.vue'
</script>

<style scoped>

</style>