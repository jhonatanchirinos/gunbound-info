import { ref, onMounted, onUnmounted } from 'vue'
import type { Emote } from '@/types/emote'
import emotesData from '@/data/emotes.json'

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

const AUDIO_CACHE = new Map<string, HTMLAudioElement>()

export function useEmoteManager() {
  const gender = ref<'male' | 'female'>('male')
  const version = ref<'old' | 'new'>('new')

  const emotesCard = ref<Emote[]>(
    emotesData.map((emote: any) => (emote.number === '10' ? { ...emote, number: '0' } : emote)),
  )

  const emoteCount = ref(0)
  const emoteBlocked = ref(false)
  const emoteMessage = ref('')
  const activeEmote = ref<string | null>(null)

  let emoteTimeout: ReturnType<typeof setTimeout> | null = null

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
    }, 400)

    const capitalizedVersion = version.value.charAt(0).toUpperCase() + version.value.slice(1)
    const capitalizedGender = gender.value.charAt(0).toUpperCase() + gender.value.slice(1)

    const sound = SOUND_MAP[number]
    if (sound) {
      const soundUrl = `/sounds/${version.value}/${gender.value}/${capitalizedVersion}${capitalizedGender}${sound}.mp3`

      let audio = AUDIO_CACHE.get(soundUrl)
      if (!audio) {
        audio = new Audio(soundUrl)
        AUDIO_CACHE.set(soundUrl, audio)
      }

      audio.currentTime = 0
      audio.play().catch((e) => console.warn('Audio play interrupted:', e))
    }
  }

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
    if (emoteTimeout) clearTimeout(emoteTimeout)
  })

  function toggleGender() {
    gender.value = gender.value === 'male' ? 'female' : 'male'
  }

  function toggleVersion() {
    version.value = version.value === 'new' ? 'old' : 'new'
  }

  return {
    gender,
    version,
    emotesCard,
    emoteMessage,
    activeEmote,
    playEmoteSound,
    toggleGender,
    toggleVersion,
  }
}
