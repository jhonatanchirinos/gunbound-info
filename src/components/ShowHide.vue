<script setup lang="ts">
import { ref } from 'vue'

//6. MOSTRAR/OCULTAR TEXTO
const mostrar = ref(false)
</script>

<template>
  <section>
    <h2>Mostrar/Ocultar texto</h2>
    <button @click="mostrar = !mostrar">{{ mostrar ? 'Ocultar' : 'Mostrar' }} texto</button>
    <p v-if="mostrar">Este es un texto visible</p>
  </section>
</template>
