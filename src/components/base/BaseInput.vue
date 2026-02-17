<script setup lang="ts">
import { defineProps } from 'vue'

const inputValue = defineModel()

defineProps<{
  id?: string
  label?: string
  type?: string
  placeholder?: string
  error?: string
  disabled?: boolean
  maxlength?: number
  required?: boolean
}>()
</script>

<template>
  <div class="flex flex-col space-y-1">
    <!-- Etiqueta -->
    <label v-if="label" class="text-sm font-medium text-gray-300">
      {{ label }} <span class="text-red-400" v-if="required">*</span>
    </label>

    <!-- Campo de entrada -->
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      v-model="inputValue"
      :disabled="disabled"
      :maxlength="maxlength"
      :required="required"
      class="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
    />

    <!-- Mensaje de error -->
    <p v-if="error" class="text-sm text-red-400 mt-1">
      {{ error }}
    </p>
  </div>
</template>
