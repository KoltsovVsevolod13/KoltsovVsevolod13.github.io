<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useVideos } from '../composables/useVideos.js'

const route = useRoute()
const { videos } = useVideos()

const searchQuery = ref(route.query.q || '')

const filteredVideos = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  
  if (!query) return videos.value

  return videos.value.filter(video => 
    video.title.toLowerCase().includes(query) ||
    video.author.toLowerCase().includes(query) ||
    (video.description && video.description.toLowerCase().includes(query)) ||
    (video.category && video.category.toLowerCase().includes(query))
  )
})

watch(() => route.query.q, (newQ) => {
  searchQuery.value = newQ || ''
}, { immediate: true })
</script>

<template>
  <div class="search-page">
    <div class="search-header">
      <h1 v-if="searchQuery">
        Результаты по запросу: <span>"{{ searchQuery }}"</span>
      </h1>
      <h1 v-else>Поиск видео</h1>
    </div>

    <div v-if="filteredVideos.length === 0 && searchQuery" class="empty-state">
      <p>По запросу «{{ searchQuery }}» ничего не найдено</p>
    </div>

    <div v-else-if="filteredVideos.length > 0" class="search-results">
      <div 
        v-for="video in filteredVideos" 
        :key="video.id"
        class="search-video-card"
        @click="$router.push(`/watch/${video.id}`)"
      >
        <div class="thumbnail">
          <img :src="video.poster" alt="thumbnail" />
        </div>
        <div class="video-info">
          <h3 class="title">{{ video.title }}</h3>
          <p class="author">{{ video.author }}</p>
          <p class="stats">{{ video.views.toLocaleString() }} просмотров</p>
          <p class="description">{{ video.description || 'Описание отсутствует' }}</p>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <p>Введите запрос в поисковую строку в шапке сайта</p>
    </div>
  </div>
</template>

<style scoped>
.search-page {
  padding: 24px 20px 40px;
  width: 100%;
}

.search-header {
  margin-bottom: 32px;
  text-align: center;
}

.search-header h1 {
  font-size: 24px;
  color: var(--fg);
}

.search-header span {
  color: var(--red);
}

.search-results {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1050px;
  margin: 0 auto;
  width: 100%;
}

.search-video-card {
  display: flex;
  gap: 20px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.search-video-card:hover {
  background: var(--hover);
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.thumbnail {
  width: 260px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background: #000;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-info {
  flex: 1;
  padding: 8px 10px 8px 0;
}

.title {
  font-size: 19px;
  line-height: 1.35;
  margin-bottom: 10px;
  font-weight: 500;
  color: var(--fg);
}

.author {
  color: var(--muted);
  font-size: 15px;
  margin: 4px 0;
}

.stats {
  color: var(--muted);
  font-size: 14.5px;
  margin-bottom: 12px;
}

.description {
  color: var(--fg);
  font-size: 15px;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.empty-state {
  text-align: center;
  padding: 140px 20px;
  color: var(--muted);
  font-size: 18px;
}

@media (max-width: 900px) {
  .search-video-card {
    flex-direction: column;
  }
  .thumbnail {
    width: 100%;
  }
}
</style>