<script setup>
import TheHeader from './components/TheHeader.vue'
import TheSidebar from './components/TheSidebar.vue'
import TheChips from './components/TheChips.vue'
import VideoCard from './components/VideoCard.vue'
import { useVideos } from './composables/useVideos.js'

const { videos } = useVideos()
</script>

<template>
  <div class="app">
    <TheHeader />
    <div class="layout">
      <TheSidebar />
      <main class="content">
        <TheChips />
        <div class="grid">
          <VideoCard
            v-for="v in videos"
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
