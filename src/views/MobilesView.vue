<script setup lang="ts">
import MobileGB from '@/components/MobileGB.vue'
import { useMobileManager } from '@/composables/useMobileManager'

const { mobileHeads, mobileRows, selectedMobile, selectedMobileInfo } = useMobileManager()
</script>

<template>
  <div class="flex flex-col overflow-x-auto mx-auto w-[1277px] max-w-full gap-2">
    <div class="flex justify-center min-w-[320px] w-full py-10 mx-auto">
      <h1 class="text-5xl font-extrabold">MOBILES</h1>
    </div>

    <!-- MOBILES TABLE -->
    <div class="px-5 md:px-0">
      <div class="overflow-x-auto custom-scrollbar pb-5">
        <table class="border-separate border-spacing-2 min-w-max">
          <thead>
            <tr>
              <!-- Empty spacer cell to offset the headers -->
              <th class="w-16 md:w-32 sticky left-2 z-20 spacer-cell" rowspan="1"></th>

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
            <tr v-for="mobileRow in mobileRows" :key="mobileRow.head">
              <th
                class="px-2 md:px-8 text-white text-xl head-cell !font-extrabold sticky left-2 z-10"
              >
                <span class="md:hidden text-xs mt-1 font-bold text-center">{{
                  mobileRow.head
                }}</span>
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
    </div>

    <div class="px-5 py-3">
      <div
        v-if="selectedMobileInfo"
        class="flex md:h-60 select-none rounded-xl gap-x-10 gap-y-6 p-5 items-center flex-col md:flex-row max-w-[400px] mx-auto md:mx-0 md:max-w-full selected-mobile-div"
        :style="{
          borderColor: selectedMobileInfo.borderColor,
          borderWidth: '7px',
          borderStyle: 'solid',
          '--border-color': selectedMobileInfo.borderColor,
        }"
      >
        <img
          class="w-40 md:w-55 scale-x-[-1]"
          :src="`/mobilesGB/${selectedMobileInfo.img}.webp`"
          draggable="false"
        />
        <div class="flex flex-col gap-y-1 max-h-full">
          <h1
            class="text-white text-4xl font-extrabold uppercase flex justify-center md:justify-start"
          >
            {{ selectedMobileInfo.label }}
          </h1>
          <p class="selected-info pr-1 overflow-y-auto max-w-[72ch] font-semibold">
            {{ selectedMobileInfo.info }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
th.head-cell {
  background: linear-gradient(to right, #232a36 30%, rgb(16, 24, 40) 100%);
  color: #fff;
  font-weight: bold;
  font-size: 1.25rem;
  letter-spacing: 2px;
  border-radius: 0.5rem;
  border-right: 6px solid white;
  text-shadow: 0 2px 8px #0008;
  box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.5);
}

th.head-cell::before,
th.spacer-cell::before {
  content: '';
  position: absolute;
  top: -15px;
  bottom: -15px;
  left: -50px; /* Cubre todo el hueco a la izquierda */
  right: 0;
  background-color: #111827;
  z-index: -1;
}

th.spacer-cell {
  pointer-events: none;
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

/* CUSTOM SCROLLBAR PARA TABLE */
.custom-scrollbar::-webkit-scrollbar {
  height: 10px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #232a36;
  border-radius: 8px;
  margin: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #3b82f6;
  border-radius: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #2563eb;
}
</style>
