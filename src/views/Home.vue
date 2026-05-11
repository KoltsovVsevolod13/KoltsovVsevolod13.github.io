<script setup>
import VideoCard from '../components/VideoCard.vue'
import { useVideos } from '../composables/useVideos.js'
import { computed } from 'vue'

const props = defineProps({
  selectedCategory: String
})

const { videos } = useVideos()

const filteredVideos = computed(() => {
  if (!props.selectedCategory || props.selectedCategory === 'Главная') {
    return videos.value
  }
  return videos.value.filter(video => video.category === props.selectedCategory)
})
</script>

<template>
  <div class="home-page">
    <div v-if="filteredVideos.length === 0" class="empty-state">
      <p>Видео в этой категории пока нет</p>
    </div>
    
    <div class="grid" v-else>
      <VideoCard
        v-for="v in filteredVideos"
        :key="v.id"
        :id="v.id"
        :title="v.title"
        :poster="v.poster"
      />
    </div>
  </div>
</template>

<style scoped>
.home-page {
  padding-top: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  gap: 24px 20px;
  max-width: 100%;
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
  padding: 100px 20px;
  color: var(--muted);
  font-size: 18px;
}
</style>