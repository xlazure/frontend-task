<template>
    <div class="panelLayout">
        <MainNavigation/>
        <div class="panelLayout__wrapper">
            <slot/>
        </div>
    </div>
</template>

<script setup>
import MainNavigation from "@/components/panel/navigation/main.vue";
</script>

<style lang="scss">
.panelLayout {
    display: grid;
    grid-template-columns: auto 1fr;
    height: 100vh;

    & h2 {
        
    margin-bottom: 1em;
    }

    &__wrapper {
        padding: 1em
    }

}
</style>