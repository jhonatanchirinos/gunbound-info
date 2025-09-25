<script setup lang="ts">
import { ref } from 'vue'
import DolarCompra from './DolarCompra.vue'
import DolarVenta from './DolarVenta.vue'

enum Currency {
  DOLARES = 'dolares',
  SOLES = 'soles',
}

// const Currency2 = {
//   DOLARES: 'dolares',
//   SOLES: 'soles'
// }

const selectedCurrency = ref<Currency>(Currency.DOLARES)

function toggleCurrency() {
  selectedCurrency.value =
    selectedCurrency.value === Currency.DOLARES ? Currency.SOLES : Currency.DOLARES

  // if (selectedCurrency.value === Currency.DOLARES) {
  //   selectedCurrency.value = Currency.SOLES
  // } else {
  //   selectedCurrency.value = Currency.DOLARES
  // }
}
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-2xl w-80 h-110 flex flex-col items-center border border-gray-200 gap-2"
  >
    <section class="w-full px-5 pt-5 flex flex-col items-center border-b-1 border-b-gray-300">
      <div class="flex gap-15 items-center">
        <div
          class="flex flex-col cursor-pointer"
          :class="selectedCurrency === Currency.DOLARES ? 'border-b-2 border-b-[#6E47E7]' : ''"
          @click="selectedCurrency = Currency.DOLARES"
        >
          <span
            class="text-xs"
            :class="selectedCurrency === Currency.DOLARES ? 'text-[#6e47e7]' : 'text-gray-700'"
            >Dólar compra</span
          >
          <span
            class="text-xs text-center font-bold"
            :class="selectedCurrency === Currency.DOLARES ? 'text-[#6e47e7]' : 'text-gray-500'"
            >3.5490</span
          >
        </div>
        <div
          class="flex flex-col cursor-pointer"
          :class="selectedCurrency === Currency.SOLES ? 'border-b-2 border-b-[#6E47E7]' : ''"
          @click="selectedCurrency = Currency.SOLES"
        >
          <span
            class="text-xs"
            :class="selectedCurrency === Currency.SOLES ? 'text-[#6e47e7]' : 'text-gray-700'"
            >Dólar venta</span
          >
          <span
            class="text-xs text-center font-bold"
            :class="selectedCurrency === Currency.SOLES ? 'text-[#6e47e7]' : 'text-gray-500'"
            >3.5770</span
          >
        </div>
      </div>
    </section>

    <div>
      <DolarCompra v-if="selectedCurrency === Currency.DOLARES" @toggleEditando="toggleCurrency" />
      <DolarVenta
        v-else-if="selectedCurrency === Currency.SOLES"
        @toggleEditando="toggleCurrency"
      />
    </div>
  </div>
</template>

<style scoped></style>
