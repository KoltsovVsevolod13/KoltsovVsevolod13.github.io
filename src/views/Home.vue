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
      
      <div v-if="videos.length === 0" class="empty-state">
        <p>Пока нет видео</p>
      </div>
      
      <div class="grid" v-else>
        <VideoCard
          v-for="v in videos"
          :key="v.id"
          :id="v.id"
          :title="v.title"
          :poster="v.poster"
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
  padding: 0 24px 40px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  gap: 24px 20px;
}

@media (min-width: 1800px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1400px) {
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  }
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: var(--muted);
  font-size: 18px;
}
</style>