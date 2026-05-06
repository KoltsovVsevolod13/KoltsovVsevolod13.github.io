<script setup>
import TheHeader from './components/TheHeader.vue'
import TheSidebar from './components/TheSidebar.vue'
import TheChips from './components/TheChips.vue'
import VideoCard from './components/VideoCard.vue'

import { useVideos } from './composables/useVideos.js'
import { useAuth } from './composables/useAuth.js'
import { useRouter, RouterView } from 'vue-router'

const { videos } = useVideos()
const { currentUser } = useAuth()
const router = useRouter()
</script>

<template>
  <div class="app">
    <TheHeader />

    <RouterView v-if="['/login', '/register'].includes(router.currentRoute.value.path)" />

    <div v-else class="layout">
      <TheSidebar />
      <main class="content">
        <TheChips />
        <div class="grid">
          <VideoCard
            v-for="v in videos"
            :key="v.id"
            :title="v.title"
          />
        </div>
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

.layout {
  display: flex;
  flex: 1;
}

.content {
  flex: 1;
  padding: 0 24px 24px;
  overflow-x: hidden;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
</style>