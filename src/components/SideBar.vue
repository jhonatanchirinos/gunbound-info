<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { routes } from '@/router'

const LG_BREAKPOINT = 1024

const isMobile = ref(window.innerWidth < LG_BREAKPOINT)
const showSidebar = ref(!isMobile.value)

const sideBarRoutes = routes.filter((r) => r.label)

function openSidebar() {
  showSidebar.value = true
}

function closeSidebar() {
  showSidebar.value = false
}

function closeSidebarIfMobile() {
  if (isMobile.value) showSidebar.value = false
}

function handleResize() {
  const mobile = window.innerWidth < LG_BREAKPOINT
  isMobile.value = mobile
  showSidebar.value = !mobile
}

onMounted(() => window.addEventListener('resize', handleResize))
onUnmounted(() => window.removeEventListener('resize', handleResize))
</script>

<template>
  <!-- Botón hamburguesa: solo cuando sidebar cerrada en móvil -->
  <button
    v-if="!showSidebar"
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

  <!-- Overlay: solo en móvil cuando sidebar abierta -->
  <Transition name="fade">
    <div
      v-if="showSidebar && isMobile"
      class="fixed inset-0 bg-black/30 z-40"
      @click="closeSidebar"
    />
  </Transition>

  <!-- Sidebar única -->
  <Transition>
    <div
      v-if="showSidebar"
      class="fixed top-0 left-0 flex flex-col items-center bg-gray-900 w-[200px] shrink-0 h-screen backdrop-blur-lg shadow-[0_0_24px_#2563eb80] z-50"
    >
      <!-- Cabecera del sidebar en celular (Botón Cerrar) -->
      <div class="w-full flex justify-end p-3 lg:hidden">
        <button
          class="bg-gray-800 p-2 rounded-md shadow-lg cursor-pointer hover:bg-gray-700 transition"
          @click="closeSidebar"
          aria-label="Cerrar menú"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <RouterLink to="/emotes" class="lg:mt-5">
        <img
          draggable="false"
          src="@/assets/gb_logo.png"
          alt="Logo GB"
          class="px-5 pb-5 pt-1 lg:pt-5 cursor-pointer"
        />
      </RouterLink>

      <RouterLink
        v-for="route in sideBarRoutes"
        :key="route.name"
        class="w-full text-center bg-gray-900 text-xl font-bold py-3 cursor-pointer duration-200 hover:text-2xl"
        activeClass="!text-3xl view-selected"
        :to="route.path"
        @click="closeSidebarIfMobile"
      >
        {{ route.label }}
      </RouterLink>
    </div>
  </Transition>
</template>

<style scoped>
.view-selected {
  background: linear-gradient(90deg, #2563eb 10%, #101828 100%);
}

* {
  user-select: none;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.2s linear;
}

.v-enter-from,
.v-leave-to {
  transform: translate(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
