<script setup lang="ts">
import { ref } from 'vue'

const newTask = ref('')
const tasks = ref<string[]>([])
// const tasks = ref([])

function addTask() {
  if (newTask.value.trim()) {
    tasks.value.push(newTask.value)
    newTask.value = ''
  }
}

function removeTask(index: number) {
  tasks.value.splice(index, 1)
}
</script>

<template>
  <div class="task">
    <h2>Agregar tareas</h2>
    <input v-model="newTask" @keyup.enter="addTask" placeholder="Agrega una tarea" />
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        {{ task }} <button @click="removeTask(index)">❌</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.task {
  max-width: 400px;
  margin: auto;
}
</style>
