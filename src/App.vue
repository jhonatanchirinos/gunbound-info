<script setup lang="ts">
import SideBar from './components/SideBar.vue'
</script>

<template>
  <SideBar v-if="$route.path !== '/login'" />

  <div :class="{ 'pl-15': $route.path !== '/login' && $route.path !== '/panel' }">
    <RouterView />
  </div>
</template>
