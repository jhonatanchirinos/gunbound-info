<script setup lang="ts">
import EmoteCard from '@/components/EmoteCard.vue'
import { useEmoteManager } from '@/composables/useEmoteManager'

const {
  gender,
  version,
  emotesCard,
  loading,
  error,
  emoteMessage,
  activeEmote,
  playEmoteSound,
  toggleGender,
  toggleVersion
} = useEmoteManager()
</script>

<template>
  <div class="flex flex-col gap-10 items-center">
    <div class="flex justify-center min-w-[320px] w-full py-10 mx-auto">
      <h1 class="text-5xl font-extrabold">EMOTES</h1>
    </div>

    <div class="flex flex-col gap-4 md:gap-7 items-center w-full">
      <!-- SWITCH SEASON -->
      <div class="flex w-full justify-center items-center gap-5 md:gap-6 font-bold md:text-lg">
        <p>SEASON 2</p>
        <div
          class="relative w-14 h-7 md:w-16 md:h-8 rounded-full cursor-pointer"
          :class="version === 'new' ? 'bg-orange-500' : 'bg-yellow-500'"
          @click="toggleVersion"
          style="transition: background-color 0.3s"
        >
          <span
            class="absolute top-1 w-5 h-5 md:w-6 md:h-6 bg-white rounded-full shadow"
            :class="version === 'new' ? 'left-8 md:left-9' : 'left-1'"
            style="transition: left 0.3s"
          ></span>
        </div>
        <p>SEASON 3</p>
      </div>
      <!-- SWITCH GENRE-->
      <div class="flex w-full justify-center items-center gap-5 md:gap-6">
        <img
          draggable="false"
          src="@/assets/female.png"
          :class="[
            gender === 'female' ? 'scale-150' : 'filter grayscale',
            'transition-transform duration-300 w-9 md:w-10',
          ]"
        />
        <div
          class="relative w-14 h-7 md:w-16 md:h-8 rounded-full cursor-pointer"
          :class="gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'"
          @click="toggleGender"
          style="transition: background-color 0.3s"
        >
          <span
            class="absolute top-1 w-5 h-5 md:w-6 md:h-6 bg-white rounded-full shadow"
            :class="gender === 'male' ? 'left-8 md:left-9' : 'left-1'"
            style="transition: left 0.3s"
          ></span>
        </div>
        <img
          draggable="false"
          src="@/assets/male.png"
          :class="[
            gender === 'male' ? 'scale-150' : 'filter grayscale',
            'transition-transform duration-300 w-10 md:w-11',
          ]"
        />
      </div>
    </div>

    <!-- ESTADO DE CARGA Y ERROR -->
    <div v-if="loading" class="flex flex-col items-center justify-center w-full h-[40vh] gap-4">
      <div
        class="w-16 h-16 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"
      ></div>
      <p class="text-gray-400 font-bold tracking-widest animate-pulse">CARGANDO RECURSOS...</p>
    </div>

    <div
      v-else-if="error"
      class="flex flex-col items-center justify-center w-full h-[40vh] gap-4 text-red-500 text-center px-5"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="size-16"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <p class="text-2xl font-bold">ERROR DE CONEXIÓN</p>
      <p class="text-gray-400 max-w-md">{{ error }}</p>
    </div>

    <!-- EMOTE CARDS -->
    <div
      v-else
      class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-[1000px] max-w-full gap-3 sm:gap-5 px-10 pb-10 sm:p-5"
    >
      <EmoteCard
        v-for="emote in emotesCard"
        :key="emote.number"
        :img="emote.img"
        :label="emote.label"
        :number="emote.number"
        :sound="emote.sound"
        :version="version"
        :gender="gender"
        :isActive="activeEmote === emote.number"
        @play="playEmoteSound"
      />
    </div>
  </div>

  <!-- MENSAJE SPAM -->
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-10 scale-90"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-10 scale-90"
  >
    <div
      v-if="emoteMessage"
      class="fixed bottom-10 left-1/2 -translate-x-1/2 lg:ml-[100px] bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg font-bold tracking-wider z-50 flex items-center justify-center gap-2 pointer-events-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="size-6 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span class="whitespace-nowrap">{{ emoteMessage }}</span>
    </div>
  </Transition>
</template>
