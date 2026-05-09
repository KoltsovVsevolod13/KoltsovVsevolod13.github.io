<script setup>
import TheHeader from './components/TheHeader.vue'
import TheSidebar from './components/TheSidebar.vue'
import { ref } from 'vue'
import { RouterView } from 'vue-router'

const isSidebarOpen = ref(true)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div class="app">
    <TheHeader @toggle-sidebar="toggleSidebar" />
    
    <div class="main-layout" :class="{ 'sidebar-open': isSidebarOpen }">
      <TheSidebar :is-open="isSidebarOpen" />
      <main class="content-area">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-layout {
  display: flex;
  flex: 1;
  transition: all 0.3s ease;
}

.content-area {
  flex: 1;
  transition: margin-left 0.3s ease;
  padding: 0 24px 40px;
}

.main-layout.sidebar-open .content-area {
  margin-left: 280px;
}

@media (max-width: 768px) {
  .main-layout.sidebar-open .content-area {
    margin-left: 0;
  }
}
</style>