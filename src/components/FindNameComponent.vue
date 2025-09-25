<script setup lang="ts">
import { ref, computed } from 'vue'

const query = ref('')
const names = ['Ana', 'Juan', 'Pedro', 'María', 'Sofía']

const filteredNames = computed(() =>
  names.filter((n) => n.toLowerCase().includes(query.value.toLowerCase())),
)
</script>

<template>
  <div class="search">
    <h2>Buscador de nombre</h2>
    <input v-model="query" placeholder="Buscar..." />
    <ul>
      <li v-for="name in filteredNames" :key="name">{{ name }}</li>
    </ul>
  </div>
</template>

<style scoped>
.search {
  max-width: 400px;
  margin: auto;
  padding: 20px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
