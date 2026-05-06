<script setup>
import TheHeader from './components/TheHeader.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <TheHeader />
    <RouterView />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>