<template>
    <div>
        <PanelNavigationCreateForm/>
        <slot />
    </div>
</template>

<script setup lang="ts">
import PanelNavigationCreateForm from '@/components/panel/navigation/createForm.vue'
</script>

<style scoped>

</style>