<!-- src/components/MovieRow.vue -->
<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import MovieItem from './MovieItem.vue'

defineProps({
  title: String,
  movies: Array,
})

const scrollContainer = useTemplateRef('scrollContainer')
// const scrollContainer = ref(null)

const scrollLeft = () => {
  scrollContainer.value.scrollBy({
    left: -200,
    behavior: 'smooth',
  })
}

const scrollRight = () => {
  scrollContainer.value.scrollBy({
    left: 200,
    behavior: 'smooth',
  })
}
</script>

<template>
  <div class="movie-row">
    <h2>{{ title }}</h2>

    <div class="scroll-wrapper">
      <button class="arrow-left" @click="scrollLeft">◀</button>

      <div class="movie-list" ref="scrollContainer">
        <MovieItem v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
      <button class="arrow-right" @click="scrollRight">▶</button>
    </div>
  </div>
</template>

<style scoped>
.movie-row {
  margin-bottom: 40px;
  position: relative;
}

.scroll-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.arrow {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
  z-index: 2;
  transition: background-color 0.2s;
}
.arrow:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
.left {
  position: absolute;
  left: 0;
}
.right {
  position: absolute;
  right: 0;
}

.movie-list {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 10px;
  padding: 10px 40px; /* deja espacio para flechas */
  scrollbar-width: none; /* Firefox */
}
.movie-list::-webkit-scrollbar {
  display: none; /* Chrome */
}
</style>
