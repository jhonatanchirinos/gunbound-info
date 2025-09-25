<script setup lang="ts">
const props = defineProps<{
  img: string
  label: string
  number: string
  sound: string
  version: string
  gender: string
  volume: number
  playEmoteSound: (number: string) => void
}>()

function handleClick() {
  props.playEmoteSound(props.number)
}

// function playSound() {
//   const capitalizedVersion = props.version.charAt(0).toUpperCase() + props.version.slice(1)
//   const capitalizedGender = props.gender.charAt(0).toUpperCase() + props.gender.slice(1)
//   const audio = new Audio(
//     `/sounds/${props.version}/${props.gender}/${capitalizedVersion}${capitalizedGender}${props.sound}.mp3`,
//   )
//   audio.volume = props.volume ?? 1
//   audio.play()
// }
</script>

<template>
  <div
    class="flex flex-col gap-5 items-center bg-gray-700 w-full rounded-xl py-5 px-3 font-semibold cursor-pointer select-none shadow-xl hover:scale-105 hover:shadow-2xl transition-transform"
    @click="handleClick"
  >
    <img :src="img" class="w-14 h-14 border border-white bg-white rounded-xl" draggable="false" />
    <p class="text-white">{{ label }}</p>
    <div class="flex gap-1 items-center text-gray-900">
      <p class="px-1 py-1 bg-[#ECEFF0] border-2 border-gray-400 rounded-lg shadow-lg">Alt</p>
      <p class="text-white">+</p>
      <p class="p-1 px-2 bg-[#ECEFF0] border-2 border-gray-400 rounded-lg shadow-lg">
        {{ number }}
      </p>
    </div>
  </div>
</template>
