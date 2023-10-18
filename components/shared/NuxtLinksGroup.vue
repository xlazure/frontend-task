<template>
    <div class="group">
        <slot/>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.group {
    border: 2px solid royalblue;
    display: inline-flex;


    a {
        text-decoration: none;
        padding: .25em 1em;
        text-align: center;
        color: royalblue;
        background-color: transparent;
        border-right: 2px solid royalblue;

        &:last-child {
            border-right: none;
        }
    }

    a.nuxt-link-exact-active {
        background-color: red;
    }


    a.nuxt-link-active {
        font-weight: bold;
    }
}
</style>G