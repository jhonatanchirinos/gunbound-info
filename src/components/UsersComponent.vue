<script setup lang="ts">
import { ref } from 'vue'
// 1. Mostrar usuarios
const users = [
  { name: 'Ana', age: 25 },
  { name: 'Luis', age: 30 },
  { name: 'Marta', age: 22 },
]

const isUsersVisible = ref(false)

const showUsers = () => {
  isUsersVisible.value = true
}
</script>

<template>
  <!-- 1. Mostrar usuarios -->
  <section>
    <h2>1. Mostrar usuarios</h2>
    <button @click="showUsers">Mostrar usuarios</button>
    <ul v-if="isUsersVisible">
      <li v-for="user in users" :key="user.name">{{ user.name }} ({{ user.age }} años)</li>
    </ul>
  </section>
</template>
