<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  img: string
  label: string
  number: string
  sound: string
  version: string
  gender: string
  isActive?: boolean
}>()

const emit = defineEmits<{
  (e: 'play', number: string): void
}>()

const isTapped = ref(false)

const dynamicClasses = computed(() => {
  const isMale = props.gender === 'male'

  // Clases compartidas tanto en verde/azul o rosa
  const hoverShared = 'md:hover:scale-105 md:hover:bg-gray-800'

  // Clases exclusivas para Hover (Desktop)
  const hoverClasses = isMale
    ? `${hoverShared} md:hover:border-blue-500 md:hover:shadow-[0_15px_30px_rgba(59,130,246,0.5)]`
    : `${hoverShared} md:hover:border-pink-500 md:hover:shadow-[0_15px_30px_rgba(236,72,153,0.5)]`

  // Clases exclusivas para Tap (Celular o Atajo de Teclado)
  const tapClasses = isMale
    ? 'scale-105 !border-blue-500 !bg-gray-800 shadow-[0_15px_30px_rgba(59,130,246,0.5)]'
    : 'scale-105 !border-pink-500 !bg-gray-800 shadow-[0_15px_30px_rgba(236,72,153,0.5)]'

  return (isTapped.value || props.isActive) ? tapClasses : hoverClasses
})

function handleClick() {
  isTapped.value = true
  setTimeout(() => {
    isTapped.value = false
  }, 400) // Se queda iluminado por 400ms para notar el tap

  emit('play', props.number)
}
</script>

<template>
  <div
    role="button"
    tabindex="0"
    class="flex flex-col gap-4 md:gap-6 items-center w-full rounded-xl py-4 md:py-6 px-3 md:px-4 font-semibold cursor-pointer select-none transition-all duration-300 bg-gray-900 border-2 border-b-[6px] border-gray-700 [-webkit-tap-highlight-color:transparent] focus:outline-none focus:ring-4 focus:ring-white/50"
    :class="dynamicClasses"
    @click="handleClick"
    @keydown.enter.prevent="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <img
      :src="img"
      class="w-14 h-14 md:w-20 md:h-20 border-2 border-b-[3px] md:border-b-[4px] border-gray-300 bg-white rounded-xl p-0.5 md:p-1"
      draggable="false"
    />
    <p
      class="text-white font-bold tracking-wider text-center text-sm md:text-lg flex items-center justify-center min-h-[40px] md:min-h-0 md:block md:w-auto"
    >
      {{ label }}
    </p>
    <div class="flex gap-1.5 md:gap-2.5 items-center text-gray-900 text-xs md:text-base">
      <p
        class="px-1.5 md:px-2.5 py-0.5 md:py-1 bg-[#ECEFF0] border-2 border-b-[3px] md:border-b-[4px] border-gray-400 rounded-md md:rounded-lg shadow-md"
      >
        Alt
      </p>
      <p class="text-gray-400 font-extrabold md:text-lg">+</p>
      <p
        class="px-2 md:px-3.5 py-0.5 md:py-1 bg-[#ECEFF0] border-2 border-b-[3px] md:border-b-[4px] border-gray-400 rounded-md md:rounded-lg shadow-md"
      >
        {{ number }}
      </p>
    </div>
  </div>
</template>
