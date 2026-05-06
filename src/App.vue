<script setup lang="ts">
import SideBar from './components/SideBar.vue'
</script>

<template>
  <SideBar />

  <div class="lg:pl-[200px]">
    <RouterView />
  </div>
</template>
