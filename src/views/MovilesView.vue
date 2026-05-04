<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import MobileGB from '@/components/MobileGB.vue'

const mobileHeads = [
  {
    label: 'MECÁNICO',
    colspan: 6,
  },
  { label: 'ESCUDO', colspan: 6 },
  { label: 'BIÓNICO', colspan: 12 },
]

interface Mobile {
  label: string
  img: string
  alt: string
  colspan: number
  borderColor: string
  clickable: boolean
  info: string
}

interface MobileRow {
  head: string
  mobiles: Mobile[]
}

const mobileRows = ref<MobileRow[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Función para obtener los móviles
const fetchMobiles = async () => {
  try {
    loading.value = true
    // const response = await fetch('http://127.0.0.1:3000/api/moviles')
    const response = await fetch('/moviles.json')

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const data = await response.json()
    mobileRows.value = data
  } catch (err) {
    error.value = (err as Error).message
    console.error('Error fetching mobiles:', err)
  } finally {
    loading.value = false
  }
}

//Cargar datos al montar el componente
onMounted(() => {
  fetchMobiles()
})

const selectedMobile = ref(null)

const selectedMobileInfo = computed(() => {
  const result = mobileRows.value
    .flatMap((row) => row.mobiles)
    .find((mobile) => mobile.label === selectedMobile.value)

  return result
})
</script>

<template>
  <div class="flex flex-col overflow-x-auto mx-auto w-[1377px] max-w-full ">
    <div class="flex justify-center w-full py-10">
      <h1 class="text-5xl font-extrabold">MÓVILES</h1>
    </div>

    <!-- MOBILES TABLE -->
    <div class="overflow-x-auto">
      <table class="border-separate border-spacing-2">
        <thead>
          <tr>
            <th class="diagonal-th invisible" rowspan="4" style="position: relative">
              <span class="flex diagonal-th-left text-xs md:hidden">DEF.</span>
              <span class="diagonal-th-left text-xs hidden md:block">DEFENSA</span>
              <span class="flex diagonal-th-right text-xs text-[#101828] md:hidden">ATQ.</span>
              <span class="diagonal-th-right text-xs text-[#101828] hidden md:block">ATAQUE</span>
            </th>

            <th
              v-for="mobileHead in mobileHeads"
              :key="mobileHead.label"
              class="text-white px-8 py-2 text-xl head-cell2 !font-extrabold"
              :colspan="mobileHead.colspan"
            >
              {{ mobileHead.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <!-- ...celdas EXPLOSIVO... -->
          </tr>
          <tr v-for="mobileRow in mobileRows" :key="mobileRow.head">
            <th class="px-2 md:px-8 text-white text-xl head-cell !font-extrabold">
              <span class="md:hidden text-xs mt-1 font-bold text-center">{{ mobileRow.head }}</span>
              <span class="hidden md:block">
                {{ mobileRow.head }}
              </span>
            </th>
            <MobileGB
              v-for="mobile in mobileRow.mobiles"
              :key="mobile.label"
              :img="mobile.img"
              :label="mobile.label"
              :alt="mobile.alt"
              :colspan="mobile.colspan"
              :borderColor="mobile.borderColor"
              :clickable="mobile.clickable"
              :info="mobile.info"
              v-model:selectedMobile="selectedMobile"
            />
          </tr>
        </tbody>
      </table>
    </div>

    <!-- {{ selectedMobileInfo?.img }} -->
    <div
      v-if="selectedMobileInfo"
      class="flex md:h-60 select-none rounded-xl gap-x-10 gap-y-6 p-5 items-center flex-col md:flex-row max-w-[400px] mx-auto md:mx-0 md:max-w-full selected-mobile-div"
      :style="{
        borderColor: selectedMobileInfo?.borderColor,
        borderWidth: '7px',
        borderStyle: 'solid',
        '--border-color': selectedMobileInfo?.borderColor,
      }"
    >
      <img
        class="w-40 md:w-55 scale-x-[-1]"
        :src="`/mobilesGB/${selectedMobileInfo?.img}.webp`"
        draggable="false"
      />
      <div class="flex flex-col gap-y-1 max-h-full">
        <h1 class="text-white text-4xl font-extrabold uppercase">
          {{ selectedMobileInfo?.label }}
        </h1>
        <p class="selected-info pr-1 overflow-y-auto max-w-[72ch] font-semibold">
          {{ selectedMobileInfo?.info }}
        </p>
      </div>
    </div>
  </div>






</template>

<style>
/* ARMOR */

th.head-cell {
  background: linear-gradient(to right, #232a36 30%, rgb(16, 24, 40) 100%);
  color: #fff;
  font-weight: bold;
  font-size: 1.25rem;
  letter-spacing: 2px;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px 0 #0004;
  border-right: 6px solid white;
  text-shadow: 0 2px 8px #0008;
}

th.head-cell2 {
  background: linear-gradient(to bottom, #232a36 30%, rgb(16, 24, 40) 100%);
  color: #fff;
  font-weight: bold;
  font-size: 1.25rem;
  letter-spacing: 2px;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px 0 #0004;
  border-bottom: 6px solid white;
  text-shadow: 0 2px 8px #0008;
}

.selected-mobile-div {
  background: linear-gradient(to top, rgb(16, 24, 40) 30%, var(--border-color));
}

@media (min-width: 768px) {
  .selected-mobile-div {
    background: linear-gradient(to left, rgb(16, 24, 40) 10%, var(--border-color));
  }
}

.diagonal-th {
  background: linear-gradient(13deg, #232a36 50%, #fcfcfc 50%);
  color: #fff;
  position: relative;
  font-weight: bold;
  font-size: 1.1rem;
  letter-spacing: 2px;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px 0 #0004;
  /* border-right: 6px solid white; */
  text-shadow: 0 2px 8px #0008;
  overflow: hidden;
  /* Ajusta según tu tabla */
}

.diagonal-th-left {
  position: absolute;
  left: 0;
  top: 0;
  width: 60%;
  height: 80%;
  /* display: flex; */
  align-items: flex-end;
  justify-content: center;
  padding-top: 12px;
  text-align: center;
}

.diagonal-th-right {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50%;
  height: 80%;
  /* display: flex; */
  align-items: flex-start;
  justify-content: center;
  padding-bottom: 12px;
  text-align: center;
}
</style>
