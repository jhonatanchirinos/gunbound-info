<script setup lang="ts">
import { ref } from 'vue'

defineEmits(['regresar-vista'])
</script>

<template>
  <img class="banner" src="../assets/bannerUPN.png" alt="" />

  <section class="wrapper">
    <form @submit.prevent="$emit('regresar-vista')">
      <div>Componente QR</div>
    </form>

    <button @click="$emit('regresar-vista')">REGRESAR</button>
  </section>
</template>

<style scoped>
.banner {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  padding: 0;
  margin: 0;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* Espacio alrededor del contenido */
}
</style>
