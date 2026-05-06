<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  img: string
  label: string
  number: string
  sound: string
  version: string
  gender: string
  playEmoteSound: (number: string) => void
}>()

const isTapped = ref(false)

function handleClick() {
  isTapped.value = true
  setTimeout(() => {
    isTapped.value = false
  }, 400) // Se queda iluminado por 400ms para notar el tap

  props.playEmoteSound(props.number)
}
</script>

<template>
  <div
    class="flex flex-col gap-5 items-center w-full rounded-xl py-5 px-3 font-semibold cursor-pointer select-none transition-all duration-300 bg-gray-900 border-2 border-b-[6px] border-gray-700 md:hover:scale-105 md:hover:border-blue-500 md:hover:bg-gray-800 md:hover:shadow-[0_15px_30px_rgba(59,130,246,0.5)] [-webkit-tap-highlight-color:transparent]"
    :class="
      isTapped
        ? 'scale-105 !border-blue-500 !bg-gray-800 shadow-[0_15px_30px_rgba(59,130,246,0.5)]'
        : ''
    "
    @click="handleClick"
  >
    <img
      :src="img"
      class="w-14 h-14 border-2 border-b-4 border-gray-300 bg-white rounded-xl p-0.5"
      draggable="false"
    />
    <p
      class="text-white font-bold tracking-wider text-center text-sm md:text-base flex items-center justify-center min-h-[40px] md:min-h-0 md:block md:w-auto"
    >
      {{ label }}
    </p>
    <div class="flex gap-1.5 md:gap-2 items-center text-gray-900 text-xs md:text-sm">
      <p
        class="px-1.5 md:px-2 py-0.5 md:py-1 bg-[#ECEFF0] border-2 border-b-[3px] md:border-b-[4px] border-gray-400 rounded-md md:rounded-lg shadow-md"
      >
        Alt
      </p>
      <p class="text-gray-400 font-extrabold">+</p>
      <p
        class="px-2 md:px-3 py-0.5 md:py-1 bg-[#ECEFF0] border-2 border-b-[3px] md:border-b-[4px] border-gray-400 rounded-md md:rounded-lg shadow-md"
      >
        {{ number }}
      </p>
    </div>
  </div>
</template>
