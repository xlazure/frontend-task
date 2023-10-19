<template>
    <NuxtLinksGroup class="mb">
        <NuxtLink :class="{ 'active-link': $route.path === '/panel/create' }" to="/panel/create">
            Produkt
        </NuxtLink>
        <NuxtLink :class="{ 'active-link': $route.path === '/panel/create/category' }" to="/panel/create/category">
            Kategoria
        </NuxtLink>
    </NuxtLinksGroup>
</template>

<script setup lang="ts">
import NuxtLinksGroup from "~/components/shared/NuxtLinksGroup.vue";
</script>

<style>
.mb {
    margin-bottom: 1em;
}
</style>