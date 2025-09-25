<template>
  <div class="relative w-full h-screen overflow-hidden snap-start video-card">
    <!-- Video de fondo -->
    <video
      ref="videoEl"
      class="w-full h-full object-cover"
      :src="videoSrc"
      playsinline
      loop
      muted
      @click="togglePlay"
    ></video>

    <!-- Overlay: texto inferior izquierdo -->
    <div class="absolute bottom-20 left-4 z-10 text-white">
      <p class="font-bold">@{{ username }}</p>
      <p class="text-sm max-w-xs break-words">{{ description }}</p>
    </div>

    <!-- Botones: lado derecho -->
    <div class="absolute bottom-20 right-4 z-10 text-white flex flex-col items-center gap-5">
      <button @click="likes++" class="flex flex-col items-center">
        ❤️
        <span class="text-xs">{{ likes }}</span>
      </button>
      <button @click="comments++" class="flex flex-col items-center">
        💬
        <span class="text-xs">{{ comments }}</span>
      </button>
      <button class="flex flex-col items-center">
        🔗
        <span class="text-xs">Share</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  videoSrc: String,
  isActive: Boolean,
  username: String,
  description: String,
})

const emit = defineEmits(['play'])

const videoEl = ref<HTMLVideoElement | null>(null)

const likes = ref(0)
const comments = ref(0)

const togglePlay = () => {
  const video = videoEl.value
  if (!video) return
  if (video.paused) {
    video.play()
    emit('play')
  } else {
    video.pause()
  }
}

watch(
  () => props.isActive,
  (newVal) => {
    if (newVal) {
      videoEl.value?.play()
    } else {
      videoEl.value?.pause()
    }
  },
)
</script>

<style scoped>
.video-card {
  scroll-snap-align: start;
}
video::-webkit-media-controls {
  display: none !important;
}
</style>
