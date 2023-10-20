<template>
  <div>
    <p v-if="pending">Loading...</p>
    <div v-else>
      <Options>
          <label>
            Select all
            <input type="checkbox" v-model="selectAll" @click="selectAllRecords">
          </label>

          <button type="button" @click="removeSelected">REMOVE</button>

      </Options>
      <TableItem v-for="{ data, id, selected } in products" :product="data" :key="id">
        <input type="checkbox" :checked="selected" @input="updateSelected(id, $event)" />
      </TableItem>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { db } from "~/lib/firebase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { ref } from "vue";
import Options from "~/components/panel/products/options.vue";
import TableItem from "~/components/panel/products/table/item.vue";

const products = ref<any[]>([])
const pending = ref<boolean>(true)
const selectAll = ref(false);


function selectAllRecords() {
  selectAll.value = !selectAll.value; 

  for (const product of products.value) {
    product.selected = selectAll.value;
  }
}


async function loadData(collectionName: string) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data = querySnapshot.docs.map((doc) => ({ data: doc.data(), id: doc.id, selected: false }));
  products.value = [...data];
  pending.value = false;
}



async function removeSelected() {
  const selectedProductIds = products.value
    .filter((product) => product.selected)
    .map((product) => product.id);

  for (const productId of selectedProductIds) {
    const productDocRef = doc(db, 'products', productId);
    try {
      await deleteDoc(productDocRef);
      const index = products.value.findIndex((product) => product.id === productId);
      if (index !== -1) {
        products.value.splice(index, 1);
      }
    } catch (e) {
      console.error('Error removing document:', e);
    }
  }
}


function updateSelected(id:string, event:any) {
  const product = products.value.find((p) => p.id === id);
  if (product) {
    product.selected = event.target.checked;
  }

  selectAll.value = products.value.every((product) => product.selected);
}

onMounted(() => loadData('products'))
</script>

<style scoped></style>