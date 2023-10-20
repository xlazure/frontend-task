<template>
    <div class="options">

        <slot />
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.options {
    padding: .5em;
    display: inline-flex;
    justify-content: flex-start;
    gap:.5em;
    width: 100%;
    background-color: #c3c3c3;
}
</style>