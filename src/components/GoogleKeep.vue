<script setup lang="ts">
import { ref } from 'vue'

const nuevaNota = ref('')
interface Nota {
  texto: string
  color: string | undefined
}

const notas = ref<Nota[]>([])

// Colores originales
const coloresDisponibles = [
  '#fff9c4', // Amarillo
  '#c8e6c9', // Verde
  '#bbdefb', // Celeste
  '#f8bbd0', // Rosa
  '#ffe0b2', // Naranja
  '#d1c4e9', // Lila
  '#b2dfdb', // Turquesa
  '#ffccbc', // Durazno
  '#cfd8dc', // Gris claro
]

const coloresPendientes = ref<string[]>([])

function mezclarColores() {
  const mezclados = [...coloresDisponibles]
  for (let i = mezclados.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[mezclados[i], mezclados[j]] = [mezclados[j], mezclados[i]]
  }
  coloresPendientes.value = mezclados
}

function colorAleatorioUnico() {
  if (coloresPendientes.value.length === 0) {
    mezclarColores()
  }
  return coloresPendientes.value.pop()
}

function agregarNota() {
  if (nuevaNota.value.trim()) {
    notas.value.push({
      texto: nuevaNota.value,
      color: colorAleatorioUnico(),
    })
    nuevaNota.value = ''
  }
}

function eliminarNota(index: number) {
  notas.value.splice(index, 1)
}

// Mezclamos por primera vez al iniciar
mezclarColores()
</script>

<template>
  <div class="keep-app">
    <h1>Mis Notas</h1>

    <div class="nueva-nota">
      <input v-model="nuevaNota" placeholder="Escribe una nota..." @keyup.enter="agregarNota" />
      <button @click="agregarNota">Agregar</button>
    </div>

    <div class="notas">
      <div
        class="nota"
        v-for="(nota, index) in notas"
        :key="index"
        :style="{ backgroundColor: nota.color }"
      >
        <p>{{ nota.texto }}</p>
        <button @click="eliminarNota(index)">❌</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.keep-app {
  max-width: 700px;
  margin: auto;
  padding: 20px;
  font-family: sans-serif;
}

.nueva-nota {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

input,
button {
  padding: 10px;
  font-size: 16px;
}

button {
  cursor: pointer;
}

.notas {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
}

.nota {
  padding: 15px;
  border-radius: 8px;
  box-shadow: 2px 2px 10px #ccc;
  position: relative;
  min-height: 100px;
}

.nota button {
  position: absolute;
  top: 5px;
  right: 5px;
  background: transparent;
  border: none;
  font-size: 18px;
}
</style>
