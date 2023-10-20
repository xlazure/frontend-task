<template>
    <div>
        <select @change="handleChange" v-model="$currencyStore.currency">
            <option :value="currency" v-for="currency in currencyData">{{currency}}</option>
        </select>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const {$currencyStore,$changeCurrency} = useNuxtApp()

const currencyData = ref(['PLN','EUR','USD'])

    function handleChange(e:Event) {
        const target = e.target as HTMLInputElement;
        $changeCurrency(target.value)
        
    }
</script>

<style lang="scss" scoped>
    select {
        color:#fff;
        border-bottom: 1px solid #fff;

        option {
           color: #000;
        }
    }
</style>