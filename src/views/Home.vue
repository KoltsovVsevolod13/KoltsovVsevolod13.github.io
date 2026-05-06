<script setup>
import TheSidebar from '../components/TheSidebar.vue'
import TheChips from '../components/TheChips.vue'
import VideoCard from '../components/VideoCard.vue'
import { useVideos } from '../composables/useVideos.js'

const { videos } = useVideos()
</script>

<template>
  <div class="layout">
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
</template>

<style scoped>
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