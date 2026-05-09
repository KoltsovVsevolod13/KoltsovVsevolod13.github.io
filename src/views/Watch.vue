<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVideos } from '../composables/useVideos.js'
import { useAuth } from '../composables/useAuth.js'

const route = useRoute()
const router = useRouter()

const { getVideoById, incrementViews, toggleLike } = useVideos()
const { currentUser, addToWatched, hasLiked, toggleLike: toggleUserLike } = useAuth()

const video = ref(null)
const loading = ref(true)

function loadVideo() {
  const foundVideo = getVideoById(route.params.id)
  
  if (foundVideo) {
    video.value = foundVideo

    if (currentUser.value) {
      const wasAdded = addToWatched(route.params.id)
      if (wasAdded) {
        incrementViews(route.params.id)
      }
    }
  } else {
    router.push('/')
  }
  
  loading.value = false
}

function handleLike() {
  if (!video.value || !currentUser.value) return

  toggleUserLike(video.value.id)
  
  const videoRef = getVideoById(video.value.id)
  if (videoRef) {
    if (hasLiked(video.value.id)) {
      videoRef.likes += 1
    } else {
      videoRef.likes = Math.max(0, videoRef.likes - 1)
    }
  }
}

onMounted(() => {
  loadVideo()
})
</script>

<template>
  <div class="watch-page">
    <div class="video-wrapper">
      <div class="video-container">
        <video 
          controls 
          autoplay 
          class="video-player"
          :poster="video?.poster"
        >
          <source :src="video?.url" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
      </div>

      <h1 class="video-title">{{ video?.title }}</h1>
      
      <div class="video-info">
        <p><strong>Автор:</strong> {{ video?.author || 'Неизвестно' }}</p>
        <p><strong>Просмотров:</strong> {{ video?.views?.toLocaleString() || 0 }}</p>
      </div>

      <div class="like-section">
        <button 
          class="like-button"
          :class="{ liked: hasLiked(video?.id) }"
          @click="handleLike"
        >
          ❤️ 
          <span class="like-count">{{ video?.likes?.toLocaleString() || 0 }}</span>
        </button>
        <span class="like-text">
          {{ hasLiked(video?.id) ? 'Вы поставили лайк' : 'Поставить лайк' }}
        </span>
      </div>

      <div class="description">
        <h3>Описание</h3>
        <p>{{ video?.description || 'Описание видео отсутствует.' }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.watch-page {
  background: var(--bg-2);
  min-height: calc(100vh - 56px);
  padding: 24px 0;
}

.video-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

.video-container {
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.video-player {
  width: 100%;
  height: auto;
  max-height: 720px;
  aspect-ratio: 16 / 9;
  background: #000;
}

.video-title {
  font-size: 26px;
  line-height: 1.3;
  margin: 20px 0 12px 0;
  color: var(--fg);
}

.video-info {
  display: flex;
  gap: 24px;
  color: var(--muted);
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border);
  font-size: 15px;
}

.like-section {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding: 16px 0;
  border-bottom: 1px solid var(--border);
}

.like-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg);
  border: 2px solid var(--border);
  border-radius: 50px;
  padding: 10px 24px;
  font-size: 22px;
  cursor: pointer;
  transition: all 0.2s;
}

.like-button:hover {
  background: #ffebee;
  border-color: #ff8a8a;
}

.like-button.liked {
  background: #e3f2fd;
  border-color: #1976d2;
  color: #1976d2;
}

.like-count {
  font-size: 18px;
  font-weight: 600;
}

.like-text {
  font-size: 15px;
  color: var(--muted);
}

.description {
  background: var(--bg);
  padding: 24px;
  border-radius: 12px;
  line-height: 1.6;
}

.description h3 {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 20px;
}

@media (max-width: 900px) {
  .video-player {
    max-height: 480px;
  }
}
</style>