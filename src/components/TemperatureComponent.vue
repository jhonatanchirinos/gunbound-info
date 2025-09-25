<script setup lang="ts">
import { ref, computed } from 'vue'

const celsius = ref(0)
const fahrenheit = computed(() => (celsius.value * 9) / 5 + 32)
</script>

<template>
  <div class="temp-converter">
    <h2>Grados Celcius a Fahrenheit</h2>
    <input v-model="celsius" type="number" placeholder="°C" />
    <!-- <input :value="celsius" @change="(e) => celsius = e.target.value" type="number" placeholder="°C" /> -->
    <p>{{ fahrenheit }} °F</p>
  </div>
</template>

<style scoped>
.temp-converter {
  max-width: 300px;
  margin: auto;
  text-align: center;
}

input {
  width: 100px;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
