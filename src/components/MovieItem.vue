<!-- src/components/MovieItem.vue -->
<script setup lang="ts">
interface Movie {
  poster: string
  title: string
}

defineProps<{
  movie: Movie
}>()
</script>

<template>
  <div class="movie-item">
    <img :src="movie.poster" :alt="movie.title" />
    <p>{{ movie.title }}</p>
  </div>
</template>

<style scoped>
.movie-item {
  flex: 0 0 auto;
  width: 120px;
  text-align: center;
}

.movie-item img {
  width: 100%;
  border-radius: 8px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.movie-item:hover img {
  transform: scale(1.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
}
</style>
