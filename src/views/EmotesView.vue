<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import EmoteCard from '@/components/EmoteCard.vue'
// import hiImage from '@/assets/Hi.webp'

// const modoOscuro = ref(false)
const gender = ref<'male' | 'female'>('male')
const version = ref<'old' | 'new'>('new')

const volume = ref(1) // 1 es el máximo
// const showVolume = ref(false)
// const lastVolume = ref(1)
// const muted = ref(false)

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
  <!-- CONTENIDO EMOTES -->
  <div class="flex flex-col max-w-full mx-auto pb-5">
    <div class="flex flex-col gap-7 items-center">
      <!-- HEADER -->
      <div class="flex justify-between w-full gap-3 pt-5 pl-20 lg:pl-0">
        <h1 class="text-3xl font-extrabold">EMOTES</h1>

        <div class="gap-5 items-center hidden md:flex">
          <!-- <template v-if="volume > 0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="3"
              stroke="currentColor"
              class="size-6 cursor-pointer"
              @click="toggleMute"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
              />
            </svg>
          </template>

          <template v-else>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="3"
              stroke="currentColor"
              class="size-6 cursor-pointer"
              @click="toggleMute"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
              />
              <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" stroke-width="2" />
            </svg>
          </template> -->

          <!-- <div class="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              :value="volume"
              @input="setVolume"
              class="w-24"
            />
            <span class="text-xs w-10 text-center inline-block font-semibold"
              >{{ Math.round(volume * 100) }}%</span
            >
          </div> -->

          <!-- MODO OSCURO -->
          <!-- <svg
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
          </svg> -->
        </div>
      </div>

      <!-- VERSION SWITCH -->
      <div class="flex w-full justify-center gap-5 font-semibold">
        <p>SEASON 2</p>
        <div
          class="relative w-14 h-7 rounded-full cursor-pointer"
          :class="version === 'new' ? 'bg-orange-400' : 'bg-gray-600'"
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

      <!-- GENRE SWITCH-->
      <section class="flex w-full justify-center items-center gap-5">
        <img
          draggable="false"
          src="@/assets/womaan.png"
          :class="[
            gender === 'female' ? ' scale-150' : 'filter grayscale ',
            'transition-transform duration-300 w-9',
          ]"
        />
        <div
          class="relative w-14 h-7 rounded-full cursor-pointer"
          :class="gender === 'male' ? 'bg-blue-500' : 'bg-red-500'"
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
          src="@/assets/maan.png"
          :class="[
            gender === 'male' ? 'scale-150' : 'filter grayscale',
            'transition-transform duration-300 w-10',
          ]"
        />
      </section>

      <!-- EMOTE CARDS -->
      <div
        class="grid [grid-template-columns:repeat(auto-fill,minmax(150px,1fr))] w-[750px] max-w-full justify-items-center gap-5 px-5"
      >
        <!-- <EmoteCard
          img="/Hi.webp"
          label="Hola"
          number="1"
          sound="Hi"
          :version="version"
          :gender="gender"
          :volume="volume"
          :playEmoteSound="playEmoteSound"
        />
        <EmoteCard
          img="/Bye.webp"
          label="Adiós"
          number="2"
          sound="Bye"
          :version="version"
          :gender="gender"
          :volume="volume"
          :playEmoteSound="playEmoteSound"
        />
        <EmoteCard
          img="/MyGod.webp"
          label="Dios Mío"
          number="3"
          sound="MyGod"
          :version="version"
          :gender="gender"
          :volume="volume"
          :playEmoteSound="playEmoteSound"
        />
        <EmoteCard
          img="/Help.webp"
          label="Ayuda"
          number="4"
          sound="Help"
          :version="version"
          :gender="gender"
          :volume="volume"
          :playEmoteSound="playEmoteSound"
        />
        <EmoteCard
          img="/Good.webp"
          label="Bien"
          number="5"
          sound="Good"
          :version="version"
          :gender="gender"
          :volume="volume"
          :playEmoteSound="playEmoteSound"
        />
        <EmoteCard
          img="/VeryGood.webp"
          label="Muy Bien"
          number="6"
          sound="VeryGood"
          :version="version"
          :gender="gender"
          :volume="volume"
          :playEmoteSound="playEmoteSound"
        />
        <EmoteCard
          img="/NiceTry.webp"
          label="Buen Intento"
          number="7"
          sound="GoodTry"
          :version="version"
          :gender="gender"
          :volume="volume"
          :playEmoteSound="playEmoteSound"
        />
        <EmoteCard
          img="/Sorry.webp"
          label="Perdón"
          number="8"
          sound="Sorry"
          :version="version"
          :gender="gender"
          :volume="volume"
          :playEmoteSound="playEmoteSound"
        />
        <EmoteCard
          img="/Noob.webp"
          label="Principiante"
          number="9"
          sound="Beginner"
          :version="version"
          :gender="gender"
          :volume="volume"
          :playEmoteSound="playEmoteSound"
        />
        <EmoteCard
          img="/Thanks.webp"
          label="Gracias"
          number="10"
          sound="Thanks"
          :version="version"
          :gender
          :volume="volume"
          :playEmoteSound="playEmoteSound"
        /> -->
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
