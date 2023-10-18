<template>
 <div>
    <p v-if="pending">Loading...</p>
    <form>
      <TableItem  />
    </form>
 </div>
</template>

<script setup lang="ts">
import {db} from "~/lib/firebase";
import {getDocs, collection} from "firebase/firestore";
import {ref} from "vue";
import TableItem from "~/components/panel/products/table/item.vue";

const products = ref<any[]>([])
const pending = ref<boolean>(true)

async function loadData(collectionName:string) {
 const querySnapshot = await getDocs(collection(db, collectionName));
 const data = querySnapshot.docs.map((doc) => ({data: doc.data(), id: doc.id}));
 products.value = [...data];
 pending.value = false;
}

onMounted(()=>loadData('products'))
</script>

<style scoped>

</style>