<script setup lang="ts">
import { ref } from 'vue'

// 4. Verificar correo
const registeredEmails = ['email1@gmail.com', 'email2@gmail.com', 'email3@gmail.com']

const emailToVerify = ref('')
const emailValidationMessage = ref('')

const checkEmailRegistration = () => {
  const emailExists = registeredEmails.includes(emailToVerify.value.trim())
  const message = emailExists
    ? ` El correo ${emailToVerify.value} ya está registrado. ✅`
    : ` El correo ${emailToVerify.value} no existe. ❌`
  emailValidationMessage.value = message
}
</script>

<template>
  <!-- 4. Verificar correo -->
  <section>
    <h2>4. Verificar correo</h2>
    <form @submit.prevent="checkEmailRegistration">
      <input v-model="emailToVerify" type="email" placeholder="email@example.com" />
      <button>Verificar</button>
    </form>

    <p v-if="emailValidationMessage !== ''">
      {{ emailValidationMessage }}
    </p>
  </section>
</template>
