<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '@/composables/useApi.js'
import { useUserStore } from '@/stores/user'
import LoginButton from '@/components/base/LoginButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import InputPassword from '@/components/inputs/InputPassword.vue'

const router = useRouter()
const { login, loading, error } = useApi()

const user = ref('')
const password = ref('')
// const password2 = ref('')
const loginError = ref('')

const userStore = useUserStore()

// Gestiona el login
async function handleLogin() {
  if (!user.value || !password.value) {
    loginError.value = 'Por favor completa todos los campos'
    return
  }

  try {
    loginError.value = ''

    const response = await login({
      email: user.value,
      password: password.value,
    })

    console.log('Login exitoso:', response)

    if (response.token) {
      localStorage.setItem('token', response.token)
      userStore.token = response.token
    }

    router.push('/')
  } catch (err) {
    loginError.value = err instanceof Error ? err.message : 'Error al iniciar sesión'
  }
}
</script>

<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-4"
  >
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <RouterLink to="/emotes" class="inline-block">
          <img src="@/assets/gb_logo.png" alt="Gunbound Logo" class="h-20 mx-auto mb-4" />
        </RouterLink>
        <h1 class="text-3xl font-extrabold text-white">GUNBOUND</h1>
        <p class="text-gray-400 mt-2">Inicia sesión para continuar</p>
      </div>

      <!-- Formulario -->
      <div class="bg-gray-900 backdrop-blur-lg shadow-[0_0_24px_#2563eb80] rounded-lg p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <BaseInput
            id="address"
            v-model="user"
            label="Usuario"
            type="text"
            placeholder="Tu usuario"
            :maxlength="10"
            required
          />

          <InputPassword v-model="password" label="Nueva contraseña" />
          <!-- <InputPassword v-model="password2" label="Confirmar contraseña" /> -->

          <!-- Error Message -->
          <div
            v-if="loginError || error"
            class="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center"
          >
            {{ loginError || error }}
          </div>

          <LoginButton :loading="loading" label="Iniciar Sesión" />

          <!-- Submit Button -->
          <!-- <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Iniciando sesión...
            </span>
            <span v-else>Iniciar Sesión</span>
          </button> -->
        </form>

        <!-- Footer Links -->
        <!-- <div class="mt-6 text-center">
          <p class="text-gray-400 text-sm">
            ¿No tienes cuenta?
            <a
              href="#"
              class="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
            >
              Regístrate aquí
            </a>
          </p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animación personalizada para el spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Alternativa más agresiva si la anterior no funciona */
input[type='text']:-webkit-autofill,
input[type='password']:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px var(--color-gray-800) inset !important;
  -webkit-text-fill-color: white !important;
  background-color: var(--color-gray-800) !important;
  border: 1px solid var(--color-gray-700) !important;
}
</style>
