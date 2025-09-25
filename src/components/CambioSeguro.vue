<script setup lang="ts">
import { ref } from 'vue'
import CotizadorComponent from './CotizadorComponent.vue'
import PromoFlash from './PromoFlash.vue'

const botonSeleccionado = ref<'cotizador' | 'promoflash'>('cotizador')
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-[#4C29AE] gap-70">
    <section class="flex flex-col gap-3">
      <h1 class="text-white text-5xl font-medium">El mejor <br />tipo de cambio</h1>
      <h2 class="text-white text-[23px] font-normal">
        Para cambiar dólares y <br />
        soles online en Perú
      </h2>
      <!-- //I want to add appstore.png and playstore.png here -->
      <div class="flex gap-4">
        <img src="@/assets/playstore.png" alt="Play Store" class="w-32 h-9 cursor-pointer" />
        <img src="@/assets/appstore.png" alt="App Store" class="w-32 h-9 cursor-pointer" />
      </div>
    </section>

    <div class="flex flex-col gap-1">
      <section
        class="bg-white rounded-2xl border-2 border-gray-400 text-black text-sm font-semibold"
      >
        <button
          class="rounded-xl px-10 py-1 cursor-pointer"
          :class="
            botonSeleccionado === 'cotizador' ? 'bg-[#4B28B1] text-white' : 'bg-white text-black'
          "
          @click="botonSeleccionado = 'cotizador'"
        >
          Cotizador
        </button>
        <button
          class="rounded-xl pl-8 pr-11 py-1 cursor-pointer"
          :class="
            botonSeleccionado === 'promoflash' ? 'bg-[#4B28B1] text-white' : 'bg-white text-black'
          "
          @click="botonSeleccionado = 'promoflash'"
        >
          PromoFLASH
        </button>
      </section>

      <div>
        <CotizadorComponent v-if="botonSeleccionado === 'cotizador'" />
        <PromoFlash v-else />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Oculta las flechas de los inputs type number */
.no-spinner::-webkit-outer-spin-button,
.no-spinner::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.no-spinner[type='number'] {
  -moz-appearance: textfield;
}
</style>
