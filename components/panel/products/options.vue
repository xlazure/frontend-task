<template>
    <div class="options">

        <div>
            <label>
                Select all
                <input type="checkbox">
            </label>

            <button>
                REMOVE
            </button>
            <button>
                PUBLISH
            </button>
            <button>
                UNPUBLISH
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.options {
    padding: .5em;
    display: inline-flex;
    justify-content: space-between;
    width: 100%;
    background-color: #c3c3c3;
}
</style>