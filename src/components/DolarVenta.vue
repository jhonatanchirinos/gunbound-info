<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits(['toggleEditando'])

const montoDolares = ref<number | null>(null)
const montoSoles = ref<number | null>(null)
const tasaCompra = 3.549

const editando = ref<'' | 'dolares' | 'soles'>('')

function actualizarSoles() {
  if (editando.value === 'dolares') {
    if (montoDolares.value !== null && !isNaN(montoDolares.value)) {
      montoSoles.value = +(montoDolares.value * tasaCompra).toFixed(2)
    } else {
      montoSoles.value = null
    }
  }
}

function actualizarDolares() {
  if (editando.value === 'soles') {
    if (montoSoles.value !== null && !isNaN(montoSoles.value)) {
      montoDolares.value = +(montoSoles.value / tasaCompra).toFixed(2)
    } else {
      montoDolares.value = null
    }
  }
}

function handleMaxlength(event: KeyboardEvent) {
  const input = event.target as HTMLInputElement
  const value = input.value

  if (
    event.ctrlKey ||
    event.key === 'Backspace' ||
    event.key === 'Delete' ||
    event.key === 'ArrowLeft' ||
    event.key === 'ArrowRight' ||
    event.key === 'Tab' ||
    event.key === 'Home' ||
    event.key === 'End' ||
    event.key === 'Control'
  ) {
    return
  }

  // allow only numbers key
  if (!/^\d$/.test(event.key) && event.key !== '.') {
    event.preventDefault()
    return
  }

  if (value.includes('.') && event.key === '.') {
    event.preventDefault()
    return
  }

  if (value.includes('.')) {
    if (value.length >= 9) {
      event.preventDefault()
    }

    if (value.split('.')[1].length >= 2) {
      event.preventDefault()
    }
  } else {
    if (event.key === '.') {
      if (value.length >= 9) {
        event.preventDefault()
      }
    } else {
      if (value.length >= 6) {
        event.preventDefault()
      }
    }
  }
}
</script>

<template>
  <div>
    <div class="flex flex-col items-center my-2">
      <span class="text-gray-700 text-xs">Monto mínimo S/3.54</span>
    </div>

    <section class="flex flex-col items-center">
      <!-- INPUT SOLES -->
      <div class="flex items-center border-[#6E47E7] border-1 gap-5 w-64">
        <span class="bg-[#F3F2F7] text-[#6e46e6] p-3 w-48 text-center">Soles</span>
        <span>S/</span>
        <input
          type="text"
          placeholder="0.00"
          class="w-full no-spinner focus:outline-none focus:ring-0 focus:border-transparent"
          v-model.number="montoSoles"
          @focus="editando = 'soles'"
          @input="actualizarDolares"
          @keydown="handleMaxlength"
        />
      </div>

      <span class="flex justify-center cursor-pointer" @click="emit('toggleEditando')">
  <img src="" alt="" />♻️
</span>

      <!-- INPUT DÓLARES -->
      <div class="flex items-center gap-5 w-64 border-[#6E47E7] border-1">
        <span class="bg-[#F3F2F7] text-[#6e46e6] p-3 w-48 text-center">Dólares</span>
        <span>$</span>
        <input
          type="text"
          placeholder="0.00"
          class="w-full no-spinner focus:outline-none focus:ring-0 focus:border-transparent"
          v-model.number="montoDolares"
          @focus="editando = 'dolares'"
          @input="actualizarSoles"
          @keydown="handleMaxlength"
        />
      </div>

      <div class="mt-1 mb-5">
        <span class="text-gray-700 text-xs">Gana <b>S/21.20</b> más que en el banco. </span>
      </div>

      <div>
        <button
          class="bg-[#694CDE] text-white rounded-md px-10 py-3 cursor-pointer hover:bg-[#4C29AE] transition-colors font-semibold"
        >
          Iniciar operación
        </button>
      </div>

      <div>
        <span class="text-gray-700 text-xs flex justify-center my-4"
          >Usa tu cupón <b class="cursor-pointer">aquí</b> .</span
        >
        <span class="text-gray-700 text-[11px] w-48 flex justify-center text-center"
          >Tipo de cambio preferencial para montos mayores a $3,000 o su equivalente en soles.</span
        >
        <span class="text-gray-700 text-[11px] w-48 flex justify-center text-center"
          >Hacer clic <b class="cursor-pointer"> aquí </b>
        </span>
      </div>
    </section>
  </div>
</template>
