<script setup>
import TheHeader from './components/TheHeader.vue'
import TheSidebar from './components/TheSidebar.vue'
import { ref, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
const isSidebarOpen = ref(true)

const showSidebar = ref(false)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function updateSidebarVisibility() {
  showSidebar.value = route.name === 'Home'
}

watch(() => route.name, updateSidebarVisibility, { immediate: true })
</script>

<template>
  <div class="app">
    <TheHeader @toggle-sidebar="toggleSidebar" />
    
    <div class="main-layout" :class="{ 'sidebar-open': isSidebarOpen && showSidebar }">

      <TheSidebar v-if="showSidebar" :is-open="isSidebarOpen" />
      
      <main class="content-area" :class="{ 'full-width': !showSidebar }">
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

.content-area.full-width {
  margin-left: 0 !important;
}

@media (max-width: 768px) {
  .main-layout.sidebar-open .content-area,
  .content-area.full-width {
    margin-left: 0;
  }
}
</style>