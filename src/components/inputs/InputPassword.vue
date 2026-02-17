<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from '../base/BaseInput.vue'

const showPassword = ref(false)
const inputValue = defineModel()

defineProps<{
  label?: string
}>()


// Mostrar/Ocultar contraseña
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <!-- Password -->
  <div>
    <div class="relative">
      <BaseInput
        v-model="inputValue"
        :label="label"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Tu contraseña"
        :maxlength="10"
        required
      />
      <button
        type="button"
        @click="togglePasswordVisibility"
        class="absolute bottom-4 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition-colors duration-200"
        aria-label="Mostrar/Ocultar contraseña"
      >
        <!-- Ojo abierto (mostrar) -->
        <svg
          v-if="!showPassword"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        <!-- Ojo cerrado (ocultar) -->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
          />
        </svg>
      </button>
    </div>
  </div>
</template>