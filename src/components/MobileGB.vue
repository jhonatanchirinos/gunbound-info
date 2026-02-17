<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  img: string
  label: string
  alt: string
  colspan: number
  borderColor: string
  clickable?: boolean
  info: string
}>()

const isSelecting = ref(false)

const selectedMobile = defineModel('selectedMobile')

function selectMobile(label: string) {
  if (props.clickable) {
    selectedMobile.value = label
  }
}

function selectRandomMobiles() {
  if (isSelecting.value) return // Evita ejecución múltiple
  isSelecting.value = true

  // Deselecciona cualquier celda activa antes de iniciar la ruleta
  const prevActive = document.querySelector('td.active-mobile')
  if (prevActive) {
    prevActive.classList.remove('active-mobile')
  }

  // Selecciona todas las celdas excepto la que tiene la imagen random.webp
  const allMobiles = Array.from(document.querySelectorAll('td[borderColor]')).filter(
    (td) => !td.querySelector('img')?.src.includes('random.webp')
  )
  // Crea un array de índices y los mezcla aleatoriamente
  const indices = allMobiles.map((_, i) => i)
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[indices[i], indices[j]] = [indices[j], indices[i]]
  }

  let currentIdx = -1
  let intervalCount = 0
  const maxIntervals = indices.length // recorre todas las celdas

  const interval = setInterval(() => {
    // Quitar el efecto de la celda anterior
    if (currentIdx !== -1) {
      allMobiles[indices[currentIdx]].classList.remove('active-mobile')
    }

    // Selecciona la siguiente celda en el orden mezclado
    currentIdx++
    allMobiles[indices[currentIdx]].classList.add('active-mobile')

    intervalCount++

    // Cuando se alcanza el máximo, dejar solo la última celda seleccionada
    if (intervalCount >= maxIntervals) {
      clearInterval(interval)
      allMobiles.forEach((td, idx) => {
        if (idx !== indices[currentIdx]) td.classList.remove('active-mobile')
      })

      // Actualiza el estado para mostrar la info del móvil elegido
      const chosenLabel = allMobiles[indices[currentIdx]].getAttribute('label')
      if (chosenLabel) {
        // Si usas defineModel en MobileGB.vue:
        selectedMobile.value = chosenLabel
        // O si usas emit:
        // emit('update:selectedMobile', chosenLabel);
      }
      isSelecting.value = false
    }
  }, 60) // velocidad rápida
}
</script>

<template>
  <td
    :class="[
      'rounded-lg cursor-pointer relative ',
      selectedMobile === label ? 'active-mobile' : '',
    ]"
    :colspan="colspan"
    :label="label"
    :borderColor="borderColor"
    :style="{ '--border-color': borderColor }"
    @click="label === 'Random' ? selectRandomMobiles() : selectMobile(label)"
  >
    <img
      :src="`/mobilesGB/${img}.webp`"
      :alt="alt"
      class="w-24 min-w-24 mx-auto select-none rounded-lg block"
      draggable="false"
    />
    <!-- absolute bottom-0 left-1/2 -translate-x-1/2  -->
    <p
      class="text-xs text-white pointer-events-none whitespace-nowrap font-semibold text-shadow-lg/90 absolute bottom-0 left-1/2 -translate-x-1/2"
    >
      {{ label }}
    </p>
  </td>

  <!-- MOBILE MODAL -->
  <!-- <Teleport to="body">
    
  </Teleport> -->
</template>

<style scoped>
/* SOLO BORDE */
/* td:has(img):hover,
td.active-mobile {
  box-shadow: 0 0 0 5px var(--border-color, #fff);
}

td:has(img):hover img,
td.active-mobile img {
  filter: drop-shadow(0 0 3px var(--border-color, #fff));
} */

/* GRADIENTE HACIA DENTRO */
/* td:has(img):hover,
td.active-mobile {
  box-shadow: 0 0 0 5px var(--border-color, #fff);
  background: radial-gradient(circle, transparent 20%, var(--border-color) 100%);

} */

/* GRADIENTE HACIA FUERA */
td:has(img):hover,
td.active-mobile {
  box-shadow: 0 0 0 5px var(--border-color, #fff);
  background: radial-gradient(circle, var(--border-color) 30%, transparent 100%);
}
</style>
