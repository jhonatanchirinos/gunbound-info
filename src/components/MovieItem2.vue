<script setup lang="ts">
defineProps({
  poster: String,
  title: String,
})
</script>

<template>
  <div class="movie-item">
    <img
      :src="`https://image.tmdb.org/t/p/w300${poster}`"
      :alt="title"
      class="rounded shadow w-full"
    />
  </div>
</template>

<style scoped>
.movie-item {
  /* min-width: 200px; */
  transition:
    filter 0.3s,
    transform 0.3s;
}
.highlighted {
  z-index: 1;
  transform: scale(1.08);
  filter: brightness(1.1) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
}
.dimmed {
  filter: brightness(0.5) grayscale(0.2);
}
img {
  user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>
