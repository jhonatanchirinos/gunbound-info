<script setup lang="ts">
import { ref } from 'vue'
// import Users from './components/UsersComponent.vue'
// import Products from './components/ProductsComponent.vue'
// import Students from './components/StudentsComponent.vue'
// import Emails from './components/EmailsComponent.vue'
// import Counter from './components/CounterComponent.vue'
// import ShowHide from './components/ShowHide.vue'
// import Upn from './components/UpnComponent.vue'
// import QrComponent from './components/QrComponent.vue'
// import TaskComponent from './components/TaskComponent.vue'
// import FindNameComponent from './components/FindNameComponent.vue'
// import TemperatureComponent from './components/TemperatureComponent.vue'
// import GoogleKeep from './components/GoogleKeep.vue'
// import FruitList from './components/SaludarComponent.vue'
// import ChangeBg from './components/ChangeBg.vue'
// import ImcCalculator from './components/ImcCalculator.vue'
// import Clock from './components/ClockComponent.vue'
// import Movies from './components/MoviesComponent.vue'
// import MoviesComponents2 from './components/MoviesComponents2.vue'
// import MusicPlayer from './components/MusicPlayer.vue'
// import TrackInfo from './components/TrackInfo.vue'
// import PlayerControls from './components/PlayerControls.vue'
// import ProgressBar from './components/ProgressBar.vue'
// import VolumeControl from './components/VolumeControl.vue'
// import VideoCard from './components/VideoCard.vue'
// import TikTokFeed from './views/TikTokFeed.vue'
// import PricingSection from './components/PricingSection.vue'
// import SearchFilter from './components/MySearchFilter.vue'
// import CambioSeguro from './components/CambioSeguro.vue'
import EmotesGB from './components/EmotesGB.vue'
import MovilesGB from './components/MovilesGB.vue'
import { routes } from './router'

// const modoOscuro = ref(false)

const showSidebar = ref(false)

// const vista = ref('a') // controla qué vista mostrar
</script>

<template>
  <!-- <Users />
  
  <Products />
  
  <Students />
  
  <Emails />
  
  <Counter />
  
  <ShowHide /> -->

  <!-- <Upn v-if="vista === 'a'" @cambiar-vista="vista = 'b'" />
  
  <QrComponent v-else @regresar-vista="vista = 'a'" /> -->
  <!-- <Clock />

  <TaskComponent />

  <FindNameComponent />

  <TemperatureComponent />

  <GoogleKeep />

  <FruitList />

  <ChangeBg />

  <ImcCalculator />
-->
  <!-- <SpotifyComponent /> -->

  <!-- <Movies />

  <MoviesComponents2 /> 

  <MusicPlayer />
  <PlayerControls />
  <ProgressBar />
  <VolumeControl /> -->

  <!-- <VideoCard />
  <TikTokFeed /> -->

  <!-- <PricingSection /> -->

  <!-- <SearchFilter /> -->

  <!-- <CambioSeguro /> -->

  <div class="flex">
    <!-- BARRA LATERAL -->
    <div
      class="hidden lg:flex flex-col items-center bg-gray-900 w-[200px] shrink-0 h-screen backdrop-blur-lg shadow-[0_0_24px_#2563eb80]"
    >
      <RouterLink to="/">
        <img
          draggable="false"
          src="@/assets/gb_logo.png"
          alt="Logo GB"
          class="p-5 cursor-pointer"
        />
      </RouterLink>

      <RouterLink
        v-for="route in routes.filter((r) => r.path !== '/')"
        :key="route.name"
        class="w-full text-center bg-gray-900 text-xl font-bold py-3 cursor-pointer duration-200 hover:text-2xl"
        activeClass="!text-3xl view-selected"
        :to="route.path"
      >
        {{ route.label }}
      </RouterLink>
    </div>

    <!-- Botón hamburguesa ESCRITORIO-->
    <button
      class="fixed top-4 left-4 z-50 bg-gray-900 p-2 rounded-md shadow-lg cursor-pointer lg:hidden"
      @click="showSidebar = true"
      aria-label="Abrir menú"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-7 w-7 text-white"
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

    <!-- CONTENIDO PRINCIPAL -->
    <RouterView />
  </div>

  <!-- Overlay para cerrar la barra lateral al hacer click fuera -->
  <div
    v-if="showSidebar"
    class="fixed inset-0 bg-black/30 z-40 lg:hidden"
    @click="showSidebar = false"
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
        @click="showSidebar = false"
        aria-label="Cerrar menú"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7 text-white"
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
        <RouterLink to="/">
          <img
            draggable="false"
            src="@/assets/gb_logo.png"
            alt="Logo GB"
            class="h-24 max-w-[120px] w-auto cursor-pointer"
          />
        </RouterLink>
      </div>
      <RouterLink
        v-for="route in routes.filter((r) => r.path !== '/')"
        :key="route.name"
        activeClass="!bg-[#2563eb] !text-3xl view-selected"
        :to="route.path"
        class="w-full text-center bg-gray-900 text-xl font-bold py-3 cursor-pointer duration-200 hover:text-2xl"
      >
        {{ route.label }}
      </RouterLink>
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
