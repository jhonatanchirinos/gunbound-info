<script setup lang="ts">
import { ref } from 'vue'

const dni = ref('')

defineEmits(['cambiar-vista']) // define el evento que emitirá al padre
</script>

<template>
  <img class="banner" src="../assets/bannerUPN.png" alt="" />

  <section class="wrapper">
    <div class="title-container">
      <h1 class="title">VERIFICA LOS DATOS DE TU PRÓXIMO EVENTO 😊</h1>
    </div>
    <div class="form-container">
      <h2>DNI</h2>

      <form class="form" @submit.prevent="$emit('cambiar-vista')">
        <input
          v-model="dni"
          class="inputBox"
          type="text"
          placeholder="Ingresa tu DNI"
          maxlength="8"
          pattern="[0-9]{8}"
          required
          @paste="console.log('Pegar no permitido')"
          @keypress="
            (event) => {
              console.log(event.key)
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault()
              }
            }
          "
        />
        <button class="submit-btn">Enviar</button>
        <p>DNI almacenado: {{ dni }}</p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.banner {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  padding: 0;
  margin: 0;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* Espacio alrededor del contenido */
}

.title-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 27px; /* Espacio alrededor del título */
  border: 1.5px solid #6731fc;
  background-color: #f5f3ff;
  color: black;
  border-radius: 20px;
  margin-top: 90px;
  margin-bottom: 45px;
  max-width: 650px;
}

.title {
  margin: 0;
  text-align: center;
  line-height: 1;
  font-weight: 600;
  font-size: 27px;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: black;
  border-radius: 20px;
  /* gap: 5px; */
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.inputBox {
  width: 500px;
  padding: 10px;
  border: 2px solid #e5e5e5;
  border-radius: 9.25px;
  font-size: 16px;
}

.submit-btn {
  width: 150px;
  background-color: #161617;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 9.25px;
  cursor: pointer;
}
</style>
