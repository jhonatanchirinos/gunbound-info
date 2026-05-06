<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import EmoteCard from '@/components/EmoteCard.vue'
// import hiImage from '@/assets/Hi.webp'


const gender = ref<'male' | 'female'>('male')
const version = ref<'old' | 'new'>('new')

const volume = ref(1) // 1 es el máximo


const emoteCount = ref(0)
const emoteBlocked = ref(false)
const emoteMessage = ref('')
let emoteTimeout: ReturnType<typeof setTimeout> | null = null

interface Emote {
  number: string
  img: string
  label: string
  sound: string
}

const emotesCard = ref<Emote[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

//Función para obtener los datos
const fetchEmotes = async () => {
  try {
    loading.value = true
    // const response = await fetch('http://127.0.0.1:3000/api/emotes')
    const response = await fetch('/emotes.json')

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
    const data = await response.json()
    emotesCard.value = data
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
  const capitalizedVersion = version.value.charAt(0).toUpperCase() + version.value.slice(1)
  const capitalizedGender = gender.value.charAt(0).toUpperCase() + gender.value.slice(1)
  const soundMap: Record<string, string> = {
    '1': 'Hi',
    '2': 'Bye',
    '3': 'MyGod',
    '4': 'Help',
    '5': 'Good',
    '6': 'VeryGood',
    '7': 'GoodTry',
    '8': 'Sorry',
    '9': 'Beginner',
    '10': 'Thanks',
  }
  const sound = soundMap[number]
  if (sound) {
    const audio = new Audio(
      `/sounds/${version.value}/${gender.value}/${capitalizedVersion}${capitalizedGender}${sound}.mp3`
    )
    audio.volume = volume.value ?? 1
    audio.play()
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
  // const saved = localStorage.getItem('modoOscuro')
  // if (saved !== null) modoOscuro.value = saved === 'true'
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

// function toggleModoOscuro() {
//   modoOscuro.value = !modoOscuro.value
//   localStorage.setItem('modoOscuro', modoOscuro.value.toString())
// }

// function toggleVolume() {
//   showVolume.value = !showVolume.value
// }

// function setVolume(e: Event) {
//   volume.value = +(e.target as HTMLInputElement).value
// }

// function toggleMute() {
//   if (!muted.value) {
//     lastVolume.value = volume.value
//     volume.value = 0
//     muted.value = true
//   } else {
//     volume.value = lastVolume.value
//     muted.value = false
//   }
// }

function toggleGender() {
  gender.value = gender.value === 'male' ? 'female' : 'male'
}

function toggleVersion() {
  version.value = version.value === 'new' ? 'old' : 'new'
}
</script>

<template>
  <div class="flex flex-col gap-10 items-center">
    <div class="flex justify-center w-full py-10">
      <h1 class="text-5xl font-extrabold">EMOTES</h1>
    </div>

    <div class="flex flex-col gap-3 items-center w-full">
        <!-- SWITCH SEASON -->
        <div class="flex w-full justify-center gap-5 font-bold">
          <p>SEASON 2</p>
          <div
            class="relative w-14 h-7 rounded-full cursor-pointer"
            :class="version === 'new' ? 'bg-orange-500' : 'bg-yellow-500'"
            @click="toggleVersion"
            style="transition: background-color 0.3s"
          >
            <span
              class="absolute top-1 w-5 h-5 bg-white rounded-full shadow"
              :class="version === 'new' ? 'left-8' : 'left-1'"
              style="transition: left 0.3s"
            ></span>
          </div>
          <p>SEASON 3</p>
        </div>
        <!-- SWITCH GENRE-->
        <div class="flex w-full justify-center items-center gap-5">
          <img
            draggable="false"
            src="@/assets/female.png"
            :class="[
              gender === 'female' ? ' scale-150' : 'filter grayscale ',
              'transition-transform duration-300 w-9',
            ]"
          />
          <div
            class="relative w-14 h-7 rounded-full cursor-pointer"
            :class="gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'"
            @click="toggleGender"
            style="transition: background-color 0.3s"
          >
            <span
              class="absolute top-1 w-5 h-5 bg-white rounded-full shadow"
              :class="gender === 'male' ? 'left-8' : 'left-1'"
              style="transition: left 0.3s"
            ></span>
          </div>
          <img
            draggable="false"
            src="@/assets/male.png"
            :class="[
              gender === 'male' ? 'scale-150' : 'filter grayscale',
              'transition-transform duration-300 w-10',
            ]"
          />
        </div>
    </div>

    <!-- EMOTE CARDS -->
    <div
        class="grid [grid-template-columns:repeat(auto-fill,minmax(150px,1fr))] w-[750px] max-w-full gap-5 p-5"
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
          :volume="volume"
          :playEmoteSound="playEmoteSound"
        />
    </div>
  </div>

  <!-- MENSAJE SPAM -->
  <div
    v-if="emoteMessage"
    class="fixed top-5 left-[48%] -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-50"
  >
    {{ emoteMessage }}
  </div>
</template>

<style scoped></style>
