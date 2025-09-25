<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const modoOscuro = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('modoOscuro')
  if (saved !== null) modoOscuro.value = saved === 'true'
})

function toggleModoOscuro() {
  modoOscuro.value = !modoOscuro.value
  localStorage.setItem('modoOscuro', modoOscuro.value.toString())
}
</script>

<template>
  <div
    :class="[
      'flex min-h-screen transition-colors duration-300 select-none',
      modoOscuro ? 'bg-[#FAF3E0] text-black' : 'bg-gray-900 text-white',
    ]"
  >
    <!-- CONTENIDO MÓVILES -->
    <div class="flex-1 flex flex-col gap-7 items-center">
      <section class="flex justify-between w-full max-w-[750px] mt-10 px-5 gap-3">
        <div>
          <h1 class="text-3xl font-extrabold">MAPAS</h1>
        </div>

        <div class="flex gap-5 items-center">
          <!-- MODO OSCURO -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-sun cursor-pointer"
            @click="toggleModoOscuro"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path
              d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"
            />
          </svg>
        </div>
      </section>
    </div>
  </div>
</template>

<style></style>
