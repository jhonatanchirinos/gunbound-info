<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MovieItem2 from './MovieItem2.vue'

// Highlight logic
const hoveredIndex = ref<number | null>(null)

// Drag-to-scroll logic
const movieListRef = ref<HTMLElement | null>(null)
let isDown = false
let startX = 0
let scrollLeft = 0

const onMouseDown = (e: MouseEvent) => {
  isDown = true
  startX = e.pageX - (movieListRef.value?.offsetLeft || 0)
  scrollLeft = movieListRef.value?.scrollLeft || 0
}
const onMouseLeave = () => {
  isDown = false
}
const onMouseUp = () => {
  isDown = false
}
const onMouseMove = (e: MouseEvent) => {
  if (!isDown) return
  e.preventDefault()
  const x = e.pageX - (movieListRef.value?.offsetLeft || 0)
  const walk = (x - startX) * 1.5 // scroll speed
  if (movieListRef.value) movieListRef.value.scrollLeft = scrollLeft - walk
}

const API_KEY = '5c2c72ff0010319442ad0e6348f2c56a'
interface Movie {
  id: number
  poster_path: string
  title: string
  // add other properties if needed
}

const movies = ref<Movie[]>([])

const getMovies = async () => {
  const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
  const data = await res.json()
  movies.value = data.results
}

onMounted(() => {
  getMovies()
})
</script>

<template>
  <div class="movie-row">
    <h2 class="text-xl font-bold mb-4">Tendencias de hoy</h2>
    <div
      class="movie-list"
      ref="movieListRef"
      @mousedown="onMouseDown"
      @mouseleave="onMouseLeave"
      @mouseup="onMouseUp"
      @mousemove="onMouseMove"
    >
      <MovieItem2
        v-for="(movie, idx) in movies"
        :key="movie.id"
        :poster="movie.poster_path"
        :title="movie.title"
        :class="{
          highlighted: hoveredIndex === idx,
          dimmed: hoveredIndex !== null && hoveredIndex !== idx,
        }"
        @mouseenter="hoveredIndex = idx"
        @mouseleave="hoveredIndex = null"
      />
    </div>
  </div>
</template>

<style scoped>
.movie-list {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  padding: 10px 0;
  scrollbar-width: none; /* Firefox */
  cursor: grab;
}
.movie-list:active {
  cursor: grabbing;
}
.movie-list::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}

.movie-row {
  overflow-x: auto;
  max-width: 100vw;
  /* or use max-width: 100vw; if you want to limit it */
}
</style>
