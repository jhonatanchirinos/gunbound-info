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
  <Transition name="fade-scale">
    <button
      v-if="!showSidebar"
      class="fixed top-4 left-4 z-50 bg-gray-900/90 backdrop-blur-md p-2 rounded-md shadow-[0_4px_12px_#00000050] border border-gray-700/50 cursor-pointer lg:hidden active:scale-90 transition-transform duration-200"
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
  </Transition>

  <!-- Overlay: solo en móvil cuando sidebar abierta -->
  <Transition name="fade">
    <div
      v-if="showSidebar && isMobile"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all"
      @click="closeSidebar"
    />
  </Transition>

  <!-- Sidebar única -->
  <Transition name="slide">
    <div
      v-if="showSidebar"
      class="fixed top-0 left-0 flex flex-col items-center bg-gray-900 w-[200px] shrink-0 h-screen backdrop-blur-lg shadow-[0_0_24px_#2563eb80] z-50"
    >
      <!-- Cabecera del sidebar en celular (Botón Cerrar) -->
      <button
        class="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-md p-2 rounded-md shadow-[0_4px_12px_#00000050] border border-gray-700/50 cursor-pointer lg:hidden active:scale-90 transition-all duration-200 z-10"
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <RouterLink to="/emotes" class="lg:mt-5 w-full flex justify-center">
        <img
          draggable="false"
          src="@/assets/gb_logo.png"
          alt="Logo GB"
          class="px-5 pb-5 pt-[80px] lg:pt-5 cursor-pointer max-w-full"
        />
      </RouterLink>

      <RouterLink
        v-for="route in sideBarRoutes"
        :key="route.name"
        class="w-full text-center bg-gray-900 text-xl font-bold py-3 cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-2xl hover:bg-gray-900/80"
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

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
