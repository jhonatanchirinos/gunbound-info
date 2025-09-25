<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const color = ref('#ffffff')
const colores = [
  '#ffccbc',
  '#c8e6c9',
  '#bbdefb',
  '#ffe082',
  '#d1c4e9',
  '#f8bbd0',
  '#cfd8dc',
  '#b2ebf2',
  '#ffecb3',
  '#dcedc8',
]

function cambiarColor() {
  const indice = Math.floor(Math.random() * colores.length)
  color.value = colores[indice]
}

let intervalId: number | undefined

onMounted(() => {
  intervalId = setInterval(cambiarColor, 5000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <div class="fondo" :style="{ backgroundColor: color }">
    <button @click="cambiarColor">Cambiar color</button>
  </div>
</template>

<style scoped>
.fondo {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
}
button {
  padding: 10px;
}
</style>
