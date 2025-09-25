<script setup lang="ts">
import { ref } from 'vue'

// 2. Filtrar productos disponibles
const products = [
  { name: 'Laptop', stock: 10 },
  { name: 'Tablet', stock: 0 },
  { name: 'Monitor', stock: 5 },
]

const availableProducts = products.filter((p) => p.stock > 0)

const isAvailableProductsVisible = ref(false)

const showAvailableProducts = () => {
  isAvailableProductsVisible.value = true
}
</script>

<template>
  <!-- 2. Filtrar productos disponibles -->
  <section>
    <h2>2. Filtrar productos disponibles</h2>
    <button @click="showAvailableProducts">Filtrar disponibles</button>
    <ul v-if="isAvailableProductsVisible">
      <li v-for="product in availableProducts" :key="product.name">
        {{ product.name }} ({{ product.stock }} en stock)
      </li>
    </ul>
  </section>
</template>
