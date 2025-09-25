<script setup lang="ts">
import { ref } from 'vue'
import MovieRow2 from './MovieRow2.vue'

// Example peliculas data, replace with your actual data or fetch logic
const peliculas = ref([])
</script>

<template>
  <div class="movie-container">
    <MovieRow2 title="Nuevas en tendencia" :movies="peliculas" />
  </div>
</template>

<style scoped>
.movie-container {
  padding: 20px;
}
</style>
