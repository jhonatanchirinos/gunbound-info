<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { routes } from '@/router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const showSidebar = ref(false)

const isLoggedIn = Boolean(userStore.token)

const sideBarRoutes = routes.filter((r) => {
  if (userStore.token) {
    return r.label
  } else {
    return r.label && !r.admin
  }
})

function handleLogout() {
  localStorage.removeItem('token')
  userStore.token = null
  router.push('/login')
}

const openSidebar = () => {
  showSidebar.value = true
}

const closeSidebar = () => {
  showSidebar.value = false
}
</script>

<template>
  <div
    class="fixed hidden lg:flex flex-col items-center bg-gray-900 w-[200px] shrink-0 h-screen backdrop-blur-lg shadow-[0_0_24px_#2563eb80]"
  >
    <RouterLink to="/emotes">
      <img draggable="false" src="@/assets/gb_logo.png" alt="Logo GB" class="p-5 cursor-pointer" />
    </RouterLink>

    <RouterLink
      v-for="route in sideBarRoutes"
      :key="route.name"
      class="w-full text-center bg-gray-900 text-xl font-bold py-3 cursor-pointer duration-200 hover:text-2xl"
      activeClass="!text-3xl view-selected"
      :to="route.path"
    >
      {{ route.label }}
    </RouterLink>

    <!-- Botón de LOGIN cuando NO está logueado -->
    <!-- <RouterLink
      v-if="!isLoggedIn"
      to="/login"
      class="w-full text-center bg-gray-900 text-xl font-bold py-3 cursor-pointer duration-200 hover:text-2xl text-green-300 hover:text-green-400"
    >
      INICIAR SESIÓN
    </RouterLink> -->

    <!-- Botón de CERRAR SESIÓN cuando SÍ está logueado -->
    <button
      v-if="isLoggedIn"
      @click="handleLogout"
      class="w-full text-center bg-gray-900 text-xl font-bold py-3 cursor-pointer duration-200 hover:text-2xl text-red-300 hover:text-red-400"
    >
      CERRAR SESIÓN
    </button>
  </div>

  <!-- Botón hamburguesa ESCRITORIO-->
  <button
    class="fixed top-4 left-4 z-50 bg-gray-900 p-2 rounded-md shadow-lg cursor-pointer lg:hidden"
    @click="openSidebar"
    aria-label="Abrir menú"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="size-7 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>

  <!-- Overlay para cerrar la barra lateral al hacer click fuera -->
  <div
    v-if="showSidebar"
    class="fixed inset-0 bg-black/30 z-40 lg:hidden"
    @click="closeSidebar"
  ></div>

  <!-- Barra lateral MÓVIL -->
  <Transition>
    <div
      v-if="showSidebar"
      class="fixed top-0 left-0 w-40 h-full bg-gray-900 flex flex-col items-center z-50 backdrop-blur-lg shadow-[0_0_24px_#2563eb80] lg:hidden"
    >
      <!-- Botón hamburguesa para cerrar, en la misma posición -->
      <button
        class="absolute top-4 left-4 z-50 bg-gray-900 p-2 rounded-md shadow-lg cursor-pointer"
        @click="closeSidebar"
        aria-label="Cerrar menú"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-7 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <!-- ...resto del contenido de la barra lateral... -->
      <div class="w-full flex items-center justify-end px-2 py-3">
        <RouterLink to="/emotes">
          <img
            draggable="false"
            src="@/assets/gb_logo.png"
            alt="Logo GB"
            class="h-24 max-w-[120px] w-auto cursor-pointer"
          />
        </RouterLink>
      </div>
      <RouterLink
        v-for="route in sideBarRoutes"
        :key="route.name"
        class="w-full text-center bg-gray-900 text-xl font-bold py-3 cursor-pointer duration-200 hover:text-2xl"
        activeClass="!text-3xl view-selected"
        :to="route.path"
      >
        {{ route.label }}
      </RouterLink>

      <!-- Botón de LOGIN cuando NO está logueado -->
      <!-- <RouterLink
        v-if="!isLoggedIn"
        to="/login"
        class="w-full text-center bg-gray-900 text-xl font-bold py-3 cursor-pointer duration-200 hover:text-2xl text-green-300 hover:text-green-400"
        @click="closeSidebar"
      >
        INICIAR SESIÓN
      </RouterLink> -->

      <!-- Botón de CERRAR SESIÓN cuando SÍ está logueado -->
      <button
        v-if="isLoggedIn"
        @click="handleLogout"
        class="w-full text-center bg-gray-900 text-xl font-bold py-3 cursor-pointer duration-200 hover:text-2xl text-red-300 hover:text-red-400"
      >
        CERRAR SESIÓN
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.view-selected {
  background: linear-gradient(90deg, #2563eb 10%, #101828 100%);

  /* border-radius: 0.5rem; */
}

* {
  user-select: none;
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: all 0.2s linear;
}

.v-enter-from,
.v-leave-to {
  transform: translate(-100%);
  /* opacity: 0; */
}
</style>
