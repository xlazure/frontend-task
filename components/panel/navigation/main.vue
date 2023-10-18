<template>
    <div class="toggle" :class="isOpen ? 'expand' : 'min' ">
        <div class="navigation">
            <div class="navigation__links">
                <NuxtLink :class="{ 'active-link': $route.path === '/' }" to="/">Go to Home</NuxtLink>
                <NuxtLink :class="{ 'active-link': $route.path === '/panel' }" to="/panel">Dashboard</NuxtLink>
                <NuxtLink :class="{ 'active-link': $route.path === '/panel/produtcs' }" to="/panel/produtcs">Products</NuxtLink>
                <NuxtLink :class="{ 'active-link': $route.path.startsWith('/panel/create') }" to="/panel/create">Create</NuxtLink>
            </div>
            <button class="navigation__btn" @click="()=> isOpen = !isOpen">X</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const isOpen = ref<boolean>(true)
</script>

<style lang="scss" scoped>
.toggle {
    transition: all .4s ease-in-out;
    display: grid;
}

.min {
    grid-template-columns: 50px;
}

.expand {
    grid-template-columns: 200px;
}


.navigation {
    position: relative;

    &__links {

        background-color: royalblue;
        height: 100%;
        display: flex;
        flex-direction: column;

        & a {
            text-decoration: none;
            color: #fff;
            text-transform: uppercase;
            text-align: center;
            width: 100%;
            padding: .8em 0;

            &:hover {
                background-color: #3058d0;
            }

        }
    }

    &__btn {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        background-color: transparent;
        border: none;
        width: 100%;
        padding: 1em 0;
    }
}
</style>