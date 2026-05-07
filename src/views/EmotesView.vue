<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import EmoteCard from '@/components/EmoteCard.vue'

const gender = ref<'male' | 'female'>('male')
const version = ref<'old' | 'new'>('new')

const emoteCount = ref(0)
const emoteBlocked = ref(false)
const emoteMessage = ref('')
const activeEmote = ref<string | null>(null)
let emoteTimeout: ReturnType<typeof setTimeout> | null = null

interface Emote {
  number: string
  img: string
  label: string
  sound: string
}

// Diccionario estático global: evita reconstruirse por cada pulsación
const SOUND_MAP: Record<string, string> = {
  '1': 'Hi',
  '2': 'Bye',
  '3': 'MyGod',
  '4': 'Help',
  '5': 'Good',
  '6': 'VeryGood',
  '7': 'GoodTry',
  '8': 'Sorry',
  '9': 'Beginner',
  '0': 'Thanks',
}

// Caché estático de instacias de Audio
const AUDIO_CACHE = new Map<string, HTMLAudioElement>()

const emotesCard = ref<Emote[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

//Función para obtener los datos
const fetchEmotes = async () => {
  try {
    loading.value = true
    const response = await fetch('/emotes.json')

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
    const data = await response.json()
    // Transformamos el '10' a '0' para que coincida de forma natural con el teclado
    emotesCard.value = data.map((emote: Emote) =>
      emote.number === '10' ? { ...emote, number: '0' } : emote,
    )
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    loading.value = false
  }
}

//Cargar datos al montar el componente
onMounted(() => {
  fetchEmotes()
})

// Función para reproducir sonido según número
function playEmoteSound(number: string) {
  if (emoteBlocked.value) {
    emoteMessage.value = 'No hagas spam!'
    return
  }
  emoteCount.value++
  if (emoteCount.value > 10) {
    emoteBlocked.value = true
    emoteMessage.value = 'No hagas spam!'
    if (emoteTimeout) clearTimeout(emoteTimeout)
    emoteTimeout = setTimeout(() => {
      emoteBlocked.value = false
      emoteCount.value = 0
      emoteMessage.value = ''
    }, 3000)
    return
  }

  activeEmote.value = number
  setTimeout(() => {
    if (activeEmote.value === number) activeEmote.value = null
  }, 400) // Se queda iluminado 400ms tras presionar el teclado

  const capitalizedVersion = version.value.charAt(0).toUpperCase() + version.value.slice(1)
  const capitalizedGender = gender.value.charAt(0).toUpperCase() + gender.value.slice(1)

  const sound = SOUND_MAP[number]
  if (sound) {
    const soundUrl = `/sounds/${version.value}/${gender.value}/${capitalizedVersion}${capitalizedGender}${sound}.mp3`

    // Recupera la instancia de memoria, o crea una nueva si es primera vez que suena
    let audio = AUDIO_CACHE.get(soundUrl)
    if (!audio) {
      audio = new Audio(soundUrl)
      AUDIO_CACHE.set(soundUrl, audio)
    }

    // Reinicia el sonido si ya estaba reproduciéndose (permite spam controlado)
    audio.currentTime = 0
    audio.play().catch((e) => console.warn('Audio play interrupted:', e))
  }
}

// Listener global para Alt + número
function handleKeydown(e: KeyboardEvent) {
  if (e.altKey) {
    for (let i = 0; i < 10; i++) {
      if (e.key === i.toString()) {
        playEmoteSound(i.toString())
        e.preventDefault()
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

function toggleGender() {
  gender.value = gender.value === 'male' ? 'female' : 'male'
}

function toggleVersion() {
  version.value = version.value === 'new' ? 'old' : 'new'
}
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
